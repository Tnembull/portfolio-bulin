import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const secretPath = process.env.NEXT_PUBLIC_ADMIN_SECRET_PATH || "mna-system-control-secret";
  const authCookie = request.cookies.get("porto_admin_auth")?.value;

  // 1. Secret Admin Route (/mna-system-control-secret or /mna-system-control-secret/*)
  if (pathname === `/${secretPath}` || pathname === `/${secretPath}/login`) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.rewrite(url);
  }

  if (pathname === `/${secretPath}/dashboard` || pathname.startsWith(`/${secretPath}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.rewrite(url);
  }

  // 2. Block direct public access to /admin or /login without auth cookie or secret path
  if (pathname === "/admin" || pathname.startsWith("/admin/") || pathname === "/login") {
    if (!authCookie || authCookie !== "true") {
      const url = request.nextUrl.clone();
      url.pathname = "/not-found";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/mna-system-control-secret/:path*",
  ],
};
