// Google reCAPTCHA server verification helper

export async function verifyRecaptchaToken(token: string | undefined | null): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.warn("[RECAPTCHA] RECAPTCHA_SECRET_KEY is not configured in environment.");
    return process.env.NODE_ENV !== "production";
  }

  if (!token || typeof token !== "string" || !token.trim()) {
    return false;
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secretKey.trim());
    params.append("response", token.trim());

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await res.json();
    return !!data.success;
  } catch (error) {
    console.error("[RECAPTCHA_VERIFY_ERROR]:", error);
    return false;
  }
}
