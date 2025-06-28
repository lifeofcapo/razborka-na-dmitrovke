import { NextResponse } from 'next/server'

export async function middleware(request) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/secretadmin__login')
  const isLoginPage = request.nextUrl.pathname === '/secretadmin__login/login'

  if (isAdminRoute && !isLoginPage) {
    return NextResponse.redirect(new URL('/secretadmin__login/login', request.url))
  }
  
  return NextResponse.next()
}