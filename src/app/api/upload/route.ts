import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadedUrl = await uploadToR2(buffer, file.name, file.type);

    if (!uploadedUrl) {
      return NextResponse.json(
        { error: "Failed to upload file to Cloudflare R2" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      url: uploadedUrl,
      fileName: file.name,
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
