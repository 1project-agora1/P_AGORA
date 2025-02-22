import {RegisterValidator} from '@/lib/validator'
import {ApiResponse} from '@/lib/api-response'
import bcrypt from 'bcryptjs'
import {PrismaClient} from '@prisma/client'
import {setCookie} from "@/lib/cookies";

const prisma = new PrismaClient()

export async function POST(request: Request) {
    try {
        // TODO: validator 및 dto 등 사용 검토 필요
        const body = await request.json()
        const validation = RegisterValidator.safeParse(body)

        // 검증 실패 처리
        if (!validation.success) {
            return Response.json({
                success: false,
                errors: validation.error.flatten().fieldErrors
            } as ApiResponse, {status: 500})
        }

        const {nickname, email, password} = validation.data

        // 단일 쿼리로 중복 체크 최적화
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{email}, {nickname}]
            },
            select: {email: true, nickname: true}
        })

        // 중복 에러 처리
        if (existingUser) {
            const errorMessage =
                existingUser.email === email
                    ? '이미 사용 중인 이메일입니다'
                    : '이미 사용 중인 닉네임입니다'

            return Response.json({
                success: false,
                error: errorMessage
            } as ApiResponse, {status: 500})
        }

        // 사용자 생성
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                nickname,
                email,
                password: hashedPassword,
                token: crypto.randomUUID()
            }
        })

        // 쿠키 설정
        await setCookie('accessToken', user.nickname, user.email);

        return Response.json({
            success: true
        } as ApiResponse, {status: 200})

    } catch (error) {
        console.error('회원 가입 에러', error)
        return Response.json({
            success: false,
            error: '회원 가입 중 오류 발생'
        } as ApiResponse, {status: 500})
    } finally {
        await prisma.$disconnect()
    }
}