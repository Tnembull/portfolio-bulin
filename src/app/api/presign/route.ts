import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPresignedUrlFromR2 } from "@/lib/r2";

export async function GET(request: Request) {
  try {
    // 1. Authenticate Request
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("porto_admin_auth")?.value;

    if (authCookie !== "true") {
      return NextResponse.json(
        { error: "Unauthorized: Admin session required to generate presigned URLs." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const rawKey = searchParams.get("key");

    if (!rawKey) {
      return NextResponse.json({ error: "Query parameter 'key' is required." }, { status: 400 });
    }

    // 2. Sanitize Key (Prevent Directory Traversal)
    const cleanKey = rawKey
      .replace(/\.\./g, "")
      .replace(/^\/+/, "")
      .trim();

    if (!cleanKey) {
      return NextResponse.json({ error: "Invalid key format." }, { status: 400 });
    }

    const presignedUrl = getPresignedUrlFromR2(cleanKey, 86400); // 24 hours validity

    return NextResponse.json({
      success: true,
      key: cleanKey,
      presignedUrl,
      expiresIn: "24 Hours (86,400s)",
    });
  } catch (error) {
    console.error("Presign API Error:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to generate presigned URL." },
      { status: 500 }
    );
  }
}
