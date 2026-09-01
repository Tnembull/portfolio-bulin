import { NextResponse } from "next/server";
import { downloadFromR2 } from "@/lib/r2";

const ALLOWED_EXTENSIONS = new Set([
  "png", "jpg", "jpeg", "webp", "avif", "svg", "gif",
  "pdf", "mp3", "wav", "mp4", "json"
]);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const rawSegments = resolvedParams.path || [];

    // Sanitize path segments to prevent directory traversal
    const safeSegments = rawSegments
      .map((s) => s.replace(/\.\./g, "").replace(/[^a-zA-Z0-9._-]/g, ""))
      .filter((s) => Boolean(s) && s !== "." && s !== "..");

    const key = safeSegments.join("/");

    if (!key) {
      return NextResponse.json({ error: "Valid file key required." }, { status: 400 });
    }

    // Validate file extension
    const ext = key.split(".").pop()?.toLowerCase() || "";
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: "Forbidden file extension." }, { status: 403 });
    }

    // Download file buffer directly from Cloudflare R2 S3 storage via SigV4
    const result = await downloadFromR2(key);

    if (result && result.buffer) {
      return new NextResponse(new Uint8Array(result.buffer), {
        headers: {
          "Content-Type": result.contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Disposition": "inline",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    // Fallback: Attempt public URL fetch if direct bucket download returns null
    const r2PublicUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL || "";
    if (r2PublicUrl) {
      const directUrl = `${r2PublicUrl.replace(/\/$/, "")}/${key}`;
      const res = await fetch(directUrl);
      if (res.ok) {
        const contentType =
          res.headers.get("content-type") ||
          (key.endsWith(".pdf") ? "application/pdf" : "image/png");
        const buffer = await res.arrayBuffer();
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
            "Content-Disposition": "inline",
            "X-Content-Type-Options": "nosniff",
          },
        });
      }
    }

    return NextResponse.json(
      { error: "File not found on Cloudflare R2 storage." },
      { status: 404 }
    );
  } catch (error) {
    console.error("Media Proxy Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to retrieve media." },
      { status: 500 }
    );
  }
}
