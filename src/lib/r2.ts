import crypto from "crypto";

const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID || "";
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || "";
export const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || "portfolio";
export const publicUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL || "https://media.bulindev.tech";

function hmac(key: Buffer | string, str: string): Buffer {
  return crypto.createHmac("sha256", key).update(str).digest();
}

function hash(data: Buffer | string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

/**
 * Native AWS SigV4 Direct Uploader to Cloudflare R2
 */
export async function uploadToR2(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string | null> {
  const key = `uploads/${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const finalPublicUrl = (process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL || publicUrl).replace(/\/$/, "");
  
  if (!accessKeyId || !secretAccessKey) {
    return `${finalPublicUrl}/${key}`;
  }

  try {
    const host = `${accountId}.r2.cloudflarestorage.com`;
    const endpoint = `https://${host}/${bucketName}/${key}`;
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]/g, "").replace(/\.\d{3}/, "");
    const dateStamp = amzDate.substring(0, 8);
    const region = "auto";
    const service = "s3";

    const payloadHash = hash(fileBuffer);
    const canonicalHeaders = `content-type:${contentType}\nhost:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
    const canonicalRequest = `PUT\n/${bucketName}/${key}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${hash(canonicalRequest)}`;

    const kDate = hmac(`AWS4${secretAccessKey}`, dateStamp);
    const kRegion = hmac(kDate, region);
    const kService = hmac(kRegion, service);
    const kSigning = hmac(kService, "aws4_request");
    const signature = hmac(kSigning, stringToSign).toString("hex");

    const authorizationHeader = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        "x-amz-date": amzDate,
        "x-amz-content-sha256": payloadHash,
        Authorization: authorizationHeader,
      },
      body: new Uint8Array(fileBuffer),
    });

    if (response.ok) {
      return `${finalPublicUrl}/${key}`;
    }
  } catch (error) {
    console.error("Cloudflare R2 Native SigV4 Upload Error:", error);
  }

  return `${finalPublicUrl}/${key}`;
}

/**
 * Generate AWS SigV4 Presigned GET URL for Cloudflare R2 objects (Temporary Preview Link)
 */
export function getPresignedUrlFromR2(
  key: string,
  expiresInSeconds: number = 86400
): string {
  const currentAccId = process.env.CLOUDFLARE_R2_ACCOUNT_ID || accountId;
  const currentKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || accessKeyId;
  const currentSecret = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || secretAccessKey;
  const currentBucket = process.env.CLOUDFLARE_R2_BUCKET_NAME || bucketName;

  // Clean key in case path starts with leading slash or full url
  let cleanKey = key;
  if (cleanKey.startsWith("/api/media/")) {
    cleanKey = cleanKey.replace("/api/media/", "");
  } else if (cleanKey.includes("/uploads/")) {
    cleanKey = `uploads/${cleanKey.split("/uploads/")[1]}`;
  }

  if (!currentKeyId || !currentSecret) {
    return `/api/media/${cleanKey}`;
  }

  try {
    const host = `${currentAccId}.r2.cloudflarestorage.com`;
    const path = `/${currentBucket}/${cleanKey}`;
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]/g, "").replace(/\.\d{3}/, "");
    const dateStamp = amzDate.substring(0, 8);
    const region = "auto";
    const service = "s3";

    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const queryMap: Record<string, string> = {
      "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
      "X-Amz-Credential": `${currentKeyId}/${credentialScope}`,
      "X-Amz-Date": amzDate,
      "X-Amz-Expires": expiresInSeconds.toString(),
      "X-Amz-SignedHeaders": "host",
    };

    const sortedQuery = Object.keys(queryMap)
      .sort()
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(queryMap[k])}`)
      .join("&");

    const canonicalHeaders = `host:${host}\n`;
    const signedHeaders = "host";
    const payloadHash = "UNSIGNED-PAYLOAD";

    const canonicalRequest = `GET\n${path}\n${sortedQuery}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${hash(canonicalRequest)}`;

    const kDate = hmac(`AWS4${currentSecret}`, dateStamp);
    const kRegion = hmac(kDate, region);
    const kService = hmac(kRegion, service);
    const kSigning = hmac(kService, "aws4_request");
    const signature = hmac(kSigning, stringToSign).toString("hex");

    return `https://${host}${path}?${sortedQuery}&X-Amz-Signature=${signature}`;
  } catch (err) {
    console.error("Presigned URL Generation Error:", err);
    return `/api/media/${cleanKey}`;
  }
}

/**
 * Native AWS SigV4 Direct Downloader from Cloudflare R2
 */
export async function downloadFromR2(
  key: string
): Promise<{ buffer: Buffer; contentType: string } | null> {
  const currentAccId = process.env.CLOUDFLARE_R2_ACCOUNT_ID || accountId;
  const currentKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || accessKeyId;
  const currentSecret = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || secretAccessKey;
  const currentBucket = process.env.CLOUDFLARE_R2_BUCKET_NAME || bucketName;

  if (!currentKeyId || !currentSecret) {
    return null;
  }

  try {
    const host = `${currentAccId}.r2.cloudflarestorage.com`;
    const endpoint = `https://${host}/${currentBucket}/${key}`;
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]/g, "").replace(/\.\d{3}/, "");
    const dateStamp = amzDate.substring(0, 8);
    const region = "auto";
    const service = "s3";

    const payloadHash = hash("");
    const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = "host;x-amz-content-sha256;x-amz-date";
    const canonicalRequest = `GET\n/${currentBucket}/${key}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${hash(canonicalRequest)}`;

    const kDate = hmac(`AWS4${currentSecret}`, dateStamp);
    const kRegion = hmac(kDate, region);
    const kService = hmac(kRegion, service);
    const kSigning = hmac(kService, "aws4_request");
    const signature = hmac(kSigning, stringToSign).toString("hex");

    const authorizationHeader = `AWS4-HMAC-SHA256 Credential=${currentKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "x-amz-date": amzDate,
        "x-amz-content-sha256": payloadHash,
        Authorization: authorizationHeader,
      },
    });

    if (response.ok) {
      const arrayBuf = await response.arrayBuffer();
      const contentType =
        response.headers.get("content-type") ||
        (key.endsWith(".pdf") ? "application/pdf" : "image/png");

      return {
        buffer: Buffer.from(arrayBuf),
        contentType,
      };
    }
  } catch (err) {
    console.error("Cloudflare R2 SigV4 Download Error:", err);
  }

  return null;
}
