import { NextResponse } from "next/server";
import { getPresignedUrlFromR2 } from "@/lib/r2";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Query parameter 'key' is required" }, { status: 400 });
    }

    const presignedUrl = getPresignedUrlFromR2(key, 86400); // 24 hours validity

    return NextResponse.json({
      success: true,
      key,
      presignedUrl,
      expiresIn: "24 Hours (86,400s)",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
