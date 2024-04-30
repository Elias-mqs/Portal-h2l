import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const token = request.localStorage.getItem('token')?.value

    if(!token) {
        if(request.nextUrl.pathname === '/'){
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }


    
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/novoChamado/:path*'],
}