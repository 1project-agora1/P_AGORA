import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { logger } from "@/lib/logger";
import { convertBigIntToString } from "@/util/ConvertBigIntToString";
import { PostPopularRequest } from "../request/PostRequest";

export class PopularPostRepository {
    private prisma = PrismaClientManager.getClient();

    async getPopularPosts(params: PostPopularRequest) {
        try {
            const totalCount = await this.prisma.popularPost.count();
            const paginatedResults = await this.prisma.popularPost.findMany({
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
                    user_nickname: true,
                },
                skip: (params.page - 1) * params.pageSize,
                take: params.pageSize,
                orderBy: {
                    score: "desc",
                },
            });

            return {
                data: convertBigIntToString(paginatedResults),
                totalCount,
                totalPages: Math.ceil(totalCount / params.pageSize),
            };
        } catch (error) {
            logger.error("[PopularPostRepository] 인기글 조회 중 오류:", error);
            throw new Error("인기글 조회 중 오류가 발생했습니다.");
        }
    }

    async deleteAllPopularPosts() {
        try {
            await this.prisma.popularPost.deleteMany();
            logger.info("[PopularPostRepository] 모든 인기글 삭제 완료");
        } catch (error) {
            logger.error("[PopularPostRepository] 인기글 삭제 중 오류:", error);
            throw new Error("인기글 삭제 중 오류가 발생했습니다.");
        }
    }

    async createManyPopularPosts(posts: any[]) {
        try {
            await this.prisma.popularPost.createMany({
                data: posts,
            });
            logger.info(
                `[PopularPostRepository] ${posts.length}개의 인기글 생성 완료`,
            );
        } catch (error) {
            logger.error("[PopularPostRepository] 인기글 생성 중 오류:", error);
            throw new Error("인기글 생성 중 오류가 발생했습니다.");
        }
    }

    async getRecentPosts(startDate: Date) {
        try {
            return await this.prisma.post.findMany({
                where: {
                    createdAt: { gte: startDate },
                },
                select: {
                    token: true,
                    title: true,
                    views: true,
                    likes: true,
                    user: {
                        select: {
                            nickname: true,
                        },
                    },
                    channel_item_token: true,
                    createdAt: true,
                    channel_item: {
                        select: {
                            token: true,
                            parent_menu_token: true,
                        },
                    },
                },
            });
        } catch (error) {
            logger.error(
                "[PopularPostRepository] 최근 게시물 조회 중 오류:",
                error,
            );
            throw new Error("최근 게시물 조회 중 오류가 발생했습니다.");
        }
    }
}
