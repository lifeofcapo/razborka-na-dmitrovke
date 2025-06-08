import { NextResponse } from 'next/server'

export async function middleware(request) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/5adm0inlog1n0sec6ret')
  const isLoginPage = request.nextUrl.pathname === '/5adm0inlog1n0sec6ret/login'
  
  // Если это админский маршрут, но не страница логина - перенаправляем на логин
  if (isAdminRoute && !isLoginPage) {
    return NextResponse.redirect(new URL('/5adm0inlog1n0sec6ret/login', request.url))
  }
  
  return NextResponse.next()
}