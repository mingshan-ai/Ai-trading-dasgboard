import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";

// Routes that don't require auth (all pages are publicly accessible)
const publicRoutes = ["/login", "/register", "/pricing"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  // Allow static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Only protect /admin routes - require authentication + admin role
  if (pathname.startsWith("/admin")) {
    const session = await auth();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // All other routes are publicly accessible
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
