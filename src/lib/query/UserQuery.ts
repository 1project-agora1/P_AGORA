import { PrismaClientManager } from "@/lib/client/PrismaClientManager";

export class UserQuery {
    async findByEmailWithPassword(email: string) {
        const prisma = PrismaClientManager.getClient();
        return prisma.user
            .findUnique({
                select: {
                    password: true,
                    nickname: true,
                    email: true,
                    token: true,
                },
                where: { email },
            })
            .then((user) =>
                user ? { ...user, password: user.password! } : null
            );
    }

    async findByEmailAndNickname(email: string, nickname: string) {
        const prisma = PrismaClientManager.getClient();
        return prisma.user.findFirst({
            select: { email: true, nickname: true },
            where: {
                OR: [{ email }, { nickname }],
            },
        });
    }

    async createUser(email: string, nickname: string, hashedPassword: string) {
        const prisma = PrismaClientManager.getClient();
        return prisma.user.create({
            data: {
                nickname,
                email,
                password: hashedPassword,
                token: crypto.randomUUID(),
            },
        });
    }
}
