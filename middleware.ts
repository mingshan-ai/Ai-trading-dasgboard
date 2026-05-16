import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";

// Routes that are always accessible (no auth needed)
const publicRoutes = ["/login", "/register", "/pricing"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // Redirect logged-in users away from auth pages
    if (pathname === "/login" || pathname === "/register") {
      const session = await auth();
      if (session?.user) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    return NextResponse.next();
  }

  // Admin routes - require admin role
  if (pathname.startsWith("/admin")) {
    const session = await auth();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // All other routes: allow access (paywall removed)
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
