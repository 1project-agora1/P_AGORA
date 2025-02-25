import {cookies} from "next/headers";
import jwt from "jsonwebtoken";

// 쿠키 설정
export async function setCookie(cookieName: string, nickname: string, email: string) {
    const cookie = await cookies();

    // JWT 생성
    const token = jwt.sign(
        {nickname: nickname, email: email},
        process.env.JWT_SECRET!,
        {expiresIn: '1h'}
    )

    cookie.set(cookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/',
    })

    return cookie;
}

// 쿠키 삭제
export async function deleteCookie(cookieName: string) {
    const cookie = await cookies();
    cookie.delete(cookieName)
}