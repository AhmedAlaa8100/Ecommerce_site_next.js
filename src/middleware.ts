import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    // If user is logged in and trying to access auth pages, redirect to main page
    if (token && (pathname === '/auth/login' || pathname === '/auth/register')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If user is not logged in and trying to access protected routes, redirect to login
    if (!token && (pathname === '/cart' || pathname === '/allorders')) {
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/cart', '/allorders', '/auth/login', '/auth/register'],
}