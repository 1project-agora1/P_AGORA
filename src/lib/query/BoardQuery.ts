import {PrismaClientManager} from "@/lib/client/PrismaClientManager";

export class BoardQuery {
    async findBoardNameByToken(boardToken: string) {
        const prisma = PrismaClientManager.getClient();
        return prisma.board.findFirst({
            select: {
                board_name: true,     // 게시판 이름
            },
            where: {
                token: boardToken,
            }
        });
    }
}