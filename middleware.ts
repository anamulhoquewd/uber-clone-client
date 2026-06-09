import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

const ROLE_HOME: Record<string, string> = {
  users: "/users/home",
  captains: "/captains/home",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value; // "users" | "captains"

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isUserRoute = pathname.startsWith("/users");
  const isCaptainRoute = pathname.startsWith("/captains");
  const isProtectedRoute = isUserRoute || isCaptainRoute;

  // Unauthenticated user trying to access a protected route
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    // Authenticated user trying to access auth pages → send to their home
    if (isAuthRoute) {
      const home = role ? ROLE_HOME[role] : "/";
      return NextResponse.redirect(new URL(home ?? "/", request.url));
    }

    // Wrong role accessing a role-specific route
    if (isUserRoute && role !== "users") {
      return NextResponse.redirect(new URL("/captains/home", request.url));
    }

    if (isCaptainRoute && role !== "captains") {
      return NextResponse.redirect(new URL("/users/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     *  - _next/static  (Next.js static assets)
     *  - _next/image   (Next.js image optimization)
     *  - favicon.ico
     *  - public folder files (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)).*)",
  ],
};
