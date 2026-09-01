import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { uploadToR2 } from "@/lib/r2";

const ALLOWED_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "image/gif",
  "application/pdf",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 Megabytes

export async function POST(request: Request) {
  try {
    // 1. Authenticate Request (Check admin auth cookie)
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("porto_admin_auth")?.value;

    if (authCookie !== "true") {
      return NextResponse.json(
        { error: "Unauthorized: Admin session required to upload files." },
        { status: 401 }
      );
    }

    // 2. Parse FormData
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // 3. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `File size exceeds the 10 MB limit (Current: ${(file.size / (1024 * 1024)).toFixed(2)} MB).`,
        },
        { status: 413 }
      );
    }

    // 4. Validate MIME Type
    const contentType = (file.type || "").toLowerCase().trim();
    if (!contentType || !ALLOWED_MIME_TYPES.has(contentType)) {
      return NextResponse.json(
        {
          error: `Invalid file type '${contentType}'. Only images (PNG, JPG, WebP, AVIF, SVG, GIF), PDFs, and audio files are allowed.`,
        },
        { status: 415 }
      );
    }

    // 5. Sanitize File Name
    const sanitizedFileName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .replace(/\.{2,}/g, ".");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 6. Direct Upload to Cloudflare R2 via SigV4
    const uploadedUrl = await uploadToR2(buffer, sanitizedFileName, contentType);

    if (!uploadedUrl) {
      return NextResponse.json(
        { error: "Failed to upload file to Cloudflare R2 storage." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrl,
      fileName: sanitizedFileName,
      size: file.size,
      contentType,
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error during upload." },
      { status: 500 }
    );
  }
}
