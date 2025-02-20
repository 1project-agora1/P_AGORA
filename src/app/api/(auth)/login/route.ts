import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcryptjs'
import {setCookie} from "@/lib/cookies";

export async function POST(request: Request) {
    const prisma = new PrismaClient()
    const {email, password} = await request.json()

    try {
        // TODO: validator 및 dto 등 사용 검토 필요
        // 단일 DB 쿼리로 사용자 조회 및 검증
        const user = await prisma.user.findUnique({
            where: {email},
            select: {id: true, password: true}
        }).then(user => user ? {...user, password: user.password!} : null)

        // 조기 반환 패턴 적용
        if (!user) {
            return new Response(
                JSON.stringify({error: '인증 실패'}),
                {status: 401}
            )
        }

        // 비밀번호 검증 (await 추가)
        const isPasswordValid = bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({error: '인증 실패'}),
                {status: 401}
            )
        }

        // 쿠키 설정
        await setCookie('accessToken', user.id.toString());

        return new Response(
            JSON.stringify({user: {id: user.id.toString()}}),
            {status: 200}
        )
    } catch (error) {
        console.error('로그인 에러', error)
        return new Response(
            JSON.stringify({error: '서버 에러'}),
            {status: 500}
        )
    } finally {
        await prisma.$disconnect()
    }
}
