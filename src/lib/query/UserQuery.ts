import {PrismaClientManager} from '@/lib/client/PrismaClientManager'

export class UserQuery {
    async findByEmailWithPassword(email: string) {
        const prisma = PrismaClientManager.getClient()
        // 단일 DB 쿼리로 사용자 조회 및 검증
        return prisma.user.findUnique({
            where: {email},
            select: {
                password: true,
                nickname: true,
                email: true
            }
        }).then(user => user ? {...user, password: user.password!} : null)
    }

    async findByEmailAndNickname(email: string, nickname: string) {
        const prisma = PrismaClientManager.getClient()
        return prisma.user.findFirst({
            where: {
                OR: [{email}, {nickname}]
            },
            select: {email: true, nickname: true}
        })
    }

    async createUser(email : string, nickname: string, hashedPassword: string) {
        const prisma = PrismaClientManager.getClient()
        return prisma.user.create({
            data: {
                nickname,
                email,
                password: hashedPassword,
                token: crypto.randomUUID()
            }
        })
    }
}
