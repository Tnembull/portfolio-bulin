import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";
import { supabase, PORTFOLIO_ROW_ID } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("admin_session")?.value;
    const isValid = await verifySessionToken(token);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Akses ditolak: Sesi tidak valid atau telah kedaluwarsa" },
        { status: 401 }
      );
    }

    const state = await req.json();
    if (!state || typeof state !== "object") {
      return NextResponse.json(
        { success: false, error: "Payload data portofolio tidak valid" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("portfolio_data").upsert(
      {
        id: PORTFOLIO_ROW_ID,
        content: state,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

    if (error) {
      console.error("[SAVE_API] Supabase upsert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Data portofolio berhasil disimpan secara aman",
    });
  } catch (error) {
    console.error("[SAVE_API] Server error:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server saat menyimpan data" },
      { status: 500 }
    );
  }
}
