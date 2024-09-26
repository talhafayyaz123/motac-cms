import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Retrieve the token using next-auth's getToken function
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define the public routes that do not require authentication
  const publicRoutes = [
    '/login',
    '/otp',
    '/forgot-password',
    '/reset-password',
  ];

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If the user is authenticated
  if (token) {
    // If the user is trying to access a public route, redirect to the dashboard
    if (isPublicRoute) {
      const dashboardUrl = new URL('/', req.url); // Change this to your dashboard path
      return NextResponse.redirect(dashboardUrl);
    }
    // Allow access to protected routes
    return NextResponse.next();
  }

  // If the user is not authenticated and trying to access a protected route
  if (!isPublicRoute) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl); // Redirect unauthenticated users to the login page
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
