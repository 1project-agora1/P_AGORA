import {ApiResponse} from "@/lib/ApiResponse";
import {UserRepository} from "@/lib/repository/UserRepository";

export async function POST() {
    try {
        const userRepository = new UserRepository()
        // 액세스 토큰 쿠키 삭제
        await userRepository.deleteCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN!)

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
