import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['vi', 'en', 'ja'] as const;
type Locale = typeof locales[number];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Remove locale from pathname if it exists (for cleanup)
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  if (locales.includes(firstSegment as Locale)) {
    // If URL has locale, remove it and redirect to clean URL
    const cleanPath = pathSegments.length > 1 
      ? `/${pathSegments.slice(1).join('/')}`
      : '/';
    const response = NextResponse.redirect(new URL(cleanPath, request.url));
    // Set locale cookie
    response.cookies.set('locale', firstSegment, { 
      path: '/', 
      maxAge: 60 * 60 * 24 * 365 // 1 year
    });
    return response;
  }

  // Just continue - locale is stored in cookie, not URL
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

