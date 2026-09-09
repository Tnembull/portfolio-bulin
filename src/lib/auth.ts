function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.trim().length >= 16) {
    return secret.trim();
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("[SECURITY] SESSION_SECRET environment variable is missing or insecure in production.");
  }
  return "dev_ephemeral_fallback_session_key_never_for_production";
}

const DEFAULT_EXPIRY_SECONDS = 60 * 60 * 24; // 24 hours

function base64UrlEncode(buffer: Uint8Array | ArrayBuffer): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface SessionPayload {
  role: string;
  exp: number;
  iat: number;
  [key: string]: unknown;
}

export async function signSessionToken(
  extraPayload: Record<string, unknown> = {},
  expiresInSeconds: number = DEFAULT_EXPIRY_SECONDS
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    role: "admin",
    iat: now,
    exp: now + expiresInSeconds,
    ...extraPayload,
  };

  const enc = new TextEncoder();
  const payloadStr = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(enc.encode(payloadStr));

  const key = await getCryptoKey(getSessionSecret());
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    enc.encode(encodedPayload)
  );
  const encodedSignature = base64UrlEncode(signature);

  return `${encodedPayload}.${encodedSignature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, encodedSignature] = parts;
  if (!encodedPayload || !encodedSignature) return false;

  try {
    const enc = new TextEncoder();
    const key = await getCryptoKey(getSessionSecret());
    const signature = base64UrlDecode(encodedSignature);

    const isValidSig = await crypto.subtle.verify(
      "HMAC",
      key,
      signature as unknown as BufferSource,
      enc.encode(encodedPayload)
    );

    if (!isValidSig) return false;

    // Check expiration
    const payloadBytes = base64UrlDecode(encodedPayload);
    const payloadText = new TextDecoder().decode(payloadBytes);
    const payload: SessionPayload = JSON.parse(payloadText);

    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function getSessionPayload(token: string | undefined | null): Promise<SessionPayload | null> {
  const isValid = await verifySessionToken(token);
  if (!isValid || !token) return null;

  try {
    const [encodedPayload] = token.split(".");
    const payloadBytes = base64UrlDecode(encodedPayload);
    const payloadText = new TextDecoder().decode(payloadBytes);
    return JSON.parse(payloadText) as SessionPayload;
  } catch {
    return null;
  }
}
