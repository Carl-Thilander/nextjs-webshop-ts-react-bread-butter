import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";
  const limit = 100; // Increased from 5 to 50 requests per 15 minutes
  const windowMs = 15 * 60 * 1000; // 15 minutes

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    const now = Date.now();
    const windowStart = now - windowMs;

    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, []);
    }

    const requestTimestamps = rateLimitMap.get(ip);
    const requestsInWindow = requestTimestamps.filter(
      (timestamp: number) => timestamp > windowStart
    );

    if (requestsInWindow.length >= limit) {
      return new NextResponse("Too many requests", { status: 429 });
    }

    requestTimestamps.push(now);
    rateLimitMap.set(ip, requestsInWindow.concat([now]));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/auth/:path*",
};

export default auth((req) => {
  return NextResponse.next();
});
