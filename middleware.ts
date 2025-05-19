import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth"; // Import the auth helper

// This function acts as middleware to protect admin routes
export async function middleware(request: NextRequest) {
  const session = await auth(); // Get the session using the auth() helper
  const { pathname } = request.nextUrl;

  // Check if this is an admin route
  if (pathname.startsWith("/admin")) {
    // If there's no session or no user in the session, redirect to signin
    if (!session?.user) {
      const url = new URL("/api/auth/signin", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    // If the user is not an admin, redirect to the homepage (or an unauthorized page)
    // Ensure your session.user object has an 'isAdmin' property
    if (!session.user.isAdmin) {
      // Or redirect to a specific "unauthorized" page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
