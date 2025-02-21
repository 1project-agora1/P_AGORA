import {deleteCookie} from "@/lib/cookies";
import {ApiResponse} from "@/lib/api-response";

export async function POST() {
    try {
        // 액세스 토큰 쿠키 삭제
        await deleteCookie('accessToken')

        return Response.json({
            success: true
        } as ApiResponse, {status: 200})

    } catch (error) {
        console.error('로그아웃 에러', error)
        return Response.json({
                success: false,
                error: '로그아웃 처리 실패'
            } as ApiResponse, {status: 500}
        )
    }
}
