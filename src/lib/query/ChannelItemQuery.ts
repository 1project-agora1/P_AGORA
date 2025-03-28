import {PrismaClientManager} from "@/lib/client/PrismaClientManager";

export class ChannelItemQuery {
    async findChannelItemInfoByToken(boardToken: string) {
        const prisma = PrismaClientManager.getClient();
        return prisma.channelItem.findFirst({
            select: {
                parent_menu_token: true, // 채널 게시판 토큰
                submenu_name: true,     // 게시판 이름
            },
            where: {
                token: boardToken,
            }
        });
    }
}