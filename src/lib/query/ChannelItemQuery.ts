import {PrismaClientManager} from "@/lib/client/PrismaClientManager";

export class ChannelItemQuery {
    async findChannelItemNameByToken(boardToken: string) {
        const prisma = PrismaClientManager.getClient();
        return prisma.channelItem.findFirst({
            select: {
                submenu_name: true,     // 게시판 이름
            },
            where: {
                token: boardToken,
            }
        });
    }
}