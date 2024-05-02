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
        console.log(authData)

        if (!authData.authenticated) {
            throw new Error('Token não fornecido')
        }
        if (authData) {
            if (req.nextUrl.pathname === '/login') {
                console.log('passou no if')
                return NextResponse.redirect(new URL('/', req.url))
            }
            return NextResponse.next()
        }
        


    } catch (error) {
        console.log(error)
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: [
        '/',
        '/novoChamado'],
}