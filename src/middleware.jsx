//src/middleware.jsx
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function middleware(req) {
    const token = req.cookies.get('token')?.value
    const authUrl = new URL('/api/me', `http://localhost:3000`);

    try {


        const authRes = await fetch(authUrl, {
            headers: { authorization: token },
        });
        const authData = await authRes.json()

        if (!authData.authenticated) {
            throw new Error('Token expirado ou não fornecido')
        }
        if (req.nextUrl.pathname == '/login') {
            return NextResponse.redirect(new URL('/', req.url))
        }

        return NextResponse.next()

    } catch (error) {
        console.log(error)
        if (error.message === 'Token expirado ou não fornecido') {
            if (req.nextUrl.pathname == '/login') {
                return NextResponse.next()
            }
            return NextResponse.redirect(new URL('/login', req.url))
        }
    }
}
export const config = {
    matcher: [
        '/',
        '/login',
        '/novoChamado',
    ],
}