import {RegisterValidator} from '@/lib/validator'
import {ApiResponse} from '@/lib/api-response'
import {UserRepository} from "@/lib/repository/UserRepository";
import {PrismaClientManager} from "@/lib/client/PrismaClientManager";
import {DuplicateUserError} from "@/lib/errors/AuthError";


export async function POST(request: Request) {
    try {
        const userRepository = new UserRepository()

        const body = await request.json()
        const validation = RegisterValidator.safeParse(body)

        // 검증 실패 처리
        if (!validation.success) {
            return Response.json({
                success: false,
                errors: validation.error.flatten().fieldErrors
            } as ApiResponse, {status: 500})
        }

        // 유저 검증
        const {nickname, email, password} = validation.data
        await userRepository.findValidUserByEmailAndNickname(email, nickname)


        // 사용자 생성
        await userRepository.createNewUser(email, nickname, password)


        return Response.json({
            success: true
        } as ApiResponse, {status: 200})

    } catch (error) {
        // 커스텀 에러
        if (error instanceof DuplicateUserError) {
            return Response.json(
                {success: false, error: error.message},
                {status: 403}
            )
        }

        console.error('회원 가입 에러', error)
        return Response.json({
            success: false,
            error: '회원 가입 중 오류 발생'
        } as ApiResponse, {status: 500})
    } finally {
        await PrismaClientManager.shutdown()
    }
}