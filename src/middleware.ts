import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // If no token and accessing a protected route, redirect to signup
  if (!token) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  // If token exists, allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/on-boarding"],
};
