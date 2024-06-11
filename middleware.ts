import { NextRequest, NextResponse } from 'next/server';

// Define the name of your login cookie
const LOGIN_COOKIE_NAME = 'your-login-cookie-name';

export function middleware(req: NextRequest) {
  // Check if the login cookie is present
  const loginCookie = req.cookies.get(LOGIN_COOKIE_NAME);

  // If the login cookie is not present, redirect to the login page
  if (!loginCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If the login cookie is present, proceed with the request
  return NextResponse.next();
}

// Apply the middleware to all routes except the login page
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api routes (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (static assets)
     * 4. /login (login page)
     */
    '/((?!api|_next|_static|login).*)',
  ],
};
