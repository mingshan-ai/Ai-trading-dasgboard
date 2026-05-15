import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRequiredPlan } from "@/lib/subscription";
import type { PlanType } from "@/lib/subscription";
import type { NextRequest } from "next/server";

const PLAN_ORDER: PlanType[] = ["FREE", "BASIC", "PRO"];

// Routes that are always accessible (no auth needed)
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

  // Admin routes - require admin role
  if (pathname.startsWith("/admin")) {
    const session = await auth();
    if (!session?.user || !session.user.isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Check if this page requires a specific plan
  const requiredPlan = getRequiredPlan(pathname);

  // No plan requirement (e.g., root "/" is FREE) - allow access
  if (!requiredPlan) {
    return NextResponse.next();
  }

  // For pages requiring BASIC or higher, check auth
  const session = await auth();

  // Admin users bypass all plan checks
  if (session?.user?.isAdmin) {
    return NextResponse.next();
  }

  // Unauthenticated users → redirect to pricing
  if (!session?.user) {
    const url = new URL("/pricing", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Check plan level
  const userPlan = (session.user.plan as PlanType) || "FREE";
  const userLevel = PLAN_ORDER.indexOf(userPlan);
  const requiredLevel = PLAN_ORDER.indexOf(requiredPlan);

  if (userLevel < requiredLevel) {
    const url = new URL("/pricing", request.url);
    url.searchParams.set("from", pathname);
    url.searchParams.set("required", requiredPlan);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
