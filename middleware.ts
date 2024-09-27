import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
  // Retrieve the token using next-auth's getToken function
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow requests for the following routes (publicly accessible):
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/otp') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password')
  ) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
