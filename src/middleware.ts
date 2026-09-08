import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const isApex = host === "bulindev.tech";
  const { pathname } = request.nextUrl;

  // Ensure user is on canonical domain (www.bulindev.tech) to prevent cross-origin 308 API issues
  if (isApex) {
    const canonicalUrl = new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      "https://www.bulindev.tech"
    );
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const sessionToken = request.cookies.get("admin_session")?.value;
  const isAuthenticated = await verifySessionToken(sessionToken);

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already authenticated, visiting /login redirects straight to /admin
  if (pathname === "/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
  ],
};
