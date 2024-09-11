import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  if (url.pathname === '/') {
    if (url.searchParams.has('page')) {
      url.pathname = `/${url.searchParams.get('page')}`
      return NextResponse.rewrite(url)
    }
  }
}

export const config = {
  matcher: '/',
}
