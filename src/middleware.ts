import { TUser } from "@/utils/tokenHelper";
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";
import { authAccessKey, authEmailVerifiedKey } from "./constant/authkey";

// Function to decode and validate JWT token
function decodeToken(token: string): TUser | null {
  try {
    const decoded = jwtDecode<TUser>(token);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

// Function to get token from cookies
function getTokenFromCookies(request: NextRequest): string | null {
  return request.cookies.get(authAccessKey)?.value || null;
}

// Function to get email verification status from cookies (fallback)
function getEmailVerificationStatus(request: NextRequest): boolean | null {
  const emailVerified = request.cookies.get(authEmailVerifiedKey)?.value;
  return emailVerified ? emailVerified === "true" : null;
}

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"];

// Routes that require email verification
const emailVerificationRequiredRoutes = ["/dashboard"];

// Function to check if the current path is protected
function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

// Function to check if the current path requires email verification
function requiresEmailVerification(pathname: string): boolean {
  return emailVerificationRequiredRoutes.some((route) =>
    pathname.startsWith(route)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Check if the current route is protected
  if (isProtectedRoute(pathname)) {
    // Get token from cookies
    const token = getTokenFromCookies(request);

    // If no token exists, redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      // Add the current URL as a redirect parameter
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Decode and validate the token
    const user = decodeToken(token);

    // If token is invalid or expired, redirect to login
    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check email verification for routes that require it
    if (requiresEmailVerification(pathname)) {
      // First try to get email verification from JWT token
      let isEmailVerified = user.emailVerified;

      // If not available in JWT, fallback to cookie
      if (isEmailVerified === undefined) {
        isEmailVerified = getEmailVerificationStatus(request);
      }
      // If email is not verified, redirect to verify-email page
      if (isEmailVerified === false || isEmailVerified === null) {
        const verifyEmailUrl = new URL("/verify-email", request.url);
        verifyEmailUrl.searchParams.set("email", user.email);
        return NextResponse.redirect(verifyEmailUrl);
      }
    }

    // Token is valid and email is verified (if required), allow access
    return NextResponse.next();
  }

  // For non-protected routes, allow access
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
