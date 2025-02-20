import { NextResponse } from 'next/server'
import {deleteCookie} from "@/lib/cookies";

export async function POST() {
    try {
        // 액세스 토큰 쿠키 삭제
        await deleteCookie('accessToken')

        return NextResponse.json(
            { success: true }
        )

    } catch (error) {
        console.error('로그아웃 에러', error)
        return NextResponse.json(
            { success: false, error: '로그아웃 처리 실패' },
            { status: 500 }
        )
    }
}
