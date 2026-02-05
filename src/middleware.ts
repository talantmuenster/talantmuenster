import { NextResponse } from 'next/server';

// Protect /admin routes: redirect to /admin/login when session cookie missing
export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Allow public assets, api session routes and the login page
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/admin/session') ||
    pathname.startsWith('/api/admin/logout') ||
    pathname === '/admin/login' ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const cookie = request.headers.get('cookie') || '';
    const hasSession = cookie.split(';').some((c) => c.trim().startsWith('session='));

    if (!hasSession) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
