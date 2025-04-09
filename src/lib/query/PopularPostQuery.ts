import { PrismaClientManager } from "../client/PrismaClientManager";

export class PopularPostQuery {
    async getPopularPosts() {
        const prisma = PrismaClientManager.getClient();

        return prisma.popularPost.findMany({
            orderBy: {
                score: "desc",
            },
            take: 10, // 상위 10개만 가져오기
            select: {
                token: true,
                title: true,
                view_count: true,
                like_count: true,
                comment_count: true,
                score: true,
                postCreatedAt: true,
                parent_menu_token: true,
                submenu_token: true,
            },
        });
    }
}
