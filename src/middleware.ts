import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('Authorization')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  console.log(request.nextUrl.pathname);
  if (isAuthPage && token) {
    console.log(isAuthPage,"redirecting to home")
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isAuthPage && !token) {
    console.log("redirecting to login",isAuthPage)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
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
} 