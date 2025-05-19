import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

// Specify edge runtime - middleware requires this
export const runtime = "edge";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }

    if (!session.user.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
