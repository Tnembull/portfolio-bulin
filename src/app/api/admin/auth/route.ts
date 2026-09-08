import { NextRequest, NextResponse } from "next/server";
import { signSessionToken, verifySessionToken } from "@/lib/auth";
import { verifyRecaptchaToken } from "@/lib/recaptcha";

// Constant-time string comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pin = typeof body.pin === "string" ? body.pin.trim() : "";
    const recaptchaToken = typeof body.recaptchaToken === "string" ? body.recaptchaToken.trim() : "";

    // 1. Enforce Google reCAPTCHA verification if secret key is configured
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { success: false, error: "Harap selesaikan verifikasi reCAPTCHA terlebih dahulu." },
          { status: 400 }
        );
      }

      const isValidRecaptcha = await verifyRecaptchaToken(recaptchaToken);
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { success: false, error: "Verifikasi reCAPTCHA tidak valid atau telah kedaluwarsa." },
          { status: 400 }
        );
      }
    }

    const expectedPin = (process.env.ADMIN_MASTER_PIN || "@Dikidiki224").trim();

    if (!pin || !timingSafeEqual(pin, expectedPin)) {
      return NextResponse.json(
        { success: false, error: "PIN verifikasi tidak valid" },
        { status: 401 }
      );
    }

    const token = await signSessionToken({ role: "admin" }, 60 * 60 * 24);

    const res = NextResponse.json({
      success: true,
      message: "Autentikasi admin berhasil",
    });

    const isProd = process.env.NODE_ENV === "production";

    // Set signed httpOnly session cookie
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return res;
  } catch (error) {
    console.error("[AUTH_API] Error processing authentication:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const isValid = await verifySessionToken(token);

  return NextResponse.json({
    authenticated: isValid,
  });
}

export async function DELETE() {
  const res = NextResponse.json({
    success: true,
    message: "Berhasil logout",
  });

  res.cookies.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  // Also clear legacy cookie if present
  res.cookies.set("porto_admin_auth", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}
