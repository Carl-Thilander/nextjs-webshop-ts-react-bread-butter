import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Get the JWT token directly
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    // If not authenticated, redirect to sign in
    if (!token) {
      const url = new URL("/api/auth/signin", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    // Check if user is admin
    const isAdmin = token.isAdmin === true;
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
