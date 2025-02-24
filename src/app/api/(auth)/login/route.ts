import {ApiResponse} from "@/lib/api-response";
import {UserRepository} from "@/lib/repository/UserRepository";
import {PrismaClientManager} from "@/lib/client/PrismaClientManager";
import {AuthenticationError} from "@/lib/errors/AuthError";

export async function POST(request: Request) {
    try {
        const {email, password} = await request.json()
        const userRepository = new UserRepository()
        const user =
            await userRepository.findValidUserByEmailWithPassword(email, password)

        await userRepository.setCookie(process.env.ACCESS_TOKEN!, user.nickname, user.email)

        return Response.json({
            success: true
        } as ApiResponse, {status: 200})
    } catch (error) {
        // 커스텀 에러
        if (error instanceof AuthenticationError) {
            return Response.json(
                {success: false, error: error.message},
                {status: 401}
            )
        }

        console.error('로그인 에러', error)
        return Response.json({
            success: false,
            error: '서버 에러'
        } as ApiResponse, {status: 500})
    } finally {
        await PrismaClientManager.shutdown()
    }
}
