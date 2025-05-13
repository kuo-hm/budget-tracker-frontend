import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hasAccessToken = request.cookies.has('accessToken')
  const hasRefreshToken = request.cookies.has('refreshToken')
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')

  // Allow API routes to handle their own authentication
  if (isApiRoute) {
    return NextResponse.next()
  }

  // If on auth page and has tokens, redirect to home
  if (isAuthPage && (hasAccessToken || hasRefreshToken)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If not on auth page and no tokens, redirect to login
  if (!isAuthPage && !hasAccessToken && !hasRefreshToken) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 