import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserType } from "./types/UserType";

// 쿠키 설정
export async function setCookie(cookieName: string, user: UserType) {
    const cookie = await cookies();

    // JWT 생성
    const token = jwt.sign(
        { nickname: user.nickname, email: user.email, token: user.token },
        process.env.NEXT_PUBLIC_ACCESS_TOKEN!,
        { expiresIn: "1h" }
    );

    cookie.set(cookieName, token, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
    });

    return cookie;
}

// 쿠키 삭제
export async function deleteCookie(cookieName: string) {
    const cookie = await cookies();
    cookie.delete(cookieName);
}
