import { logger } from "@/lib/logger";
import { PrismaClient } from "@prisma/client";

// src/batch/jobs/popularPostJob.ts
export class PopularPostJob {
    // 점수 계산 상수
    private static readonly SCORE_WEIGHTS = {
        VIEW: 1,
        LIKE: 2,
        COMMENT: 3,
    };

    private static readonly TIME_DECAY = 1.8;

    static async execute() {
        const startTime = Date.now();
        logger.info("[PopularPostJob] 인기글 집계 시작");

        try {
            await this.processPopularPosts();

            const executionTime = Date.now() - startTime;
            logger.info(
                `[PopularPostJob] 인기글 집계 완료 (${executionTime}ms)`,
            );
        } catch (error) {
            logger.error("[PopularPostJob] 인기글 집계 중 오류 발생:", error);
            throw error;
        }
    }

    private static async processPopularPosts() {
        // 최근 7일 게시물만 처리
        const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        // 기존 데이터 삭제
        const prisma = new PrismaClient();
        await prisma.popularPost.deleteMany();

        // 게시글 집계
        const posts = await prisma.post.findMany({
            where: {
                createdAt: { gte: startDate },
            },
            select: {
                token: true,
                title: true,
                views: true,
                likes: true,
                channel_item_token: true,
                createdAt: true,
            },
        });

        // 점수 계산 및 저장
        const popularPosts = posts.map((post) => {
            const baseScore = this.calculateBaseScore({
                views: post.views,
                likes: post.likes,
            });
            const finalScore = this.applyTimeDecay(baseScore, post.createdAt);
            console.log("finalScore", finalScore);

            return {
                token: post.token,
                post_token: post.token,
                parent_menu_token: post.channel_item_token,
                submenu_token: post.channel_item_token,
                title: post.title,
                view_count: post.views,
                like_count: post.likes,
                score: finalScore,
                postCreatedAt: post.createdAt,
            };
        });

        // 배치 삽입
        await prisma.popularPost.createMany({
            data: popularPosts,
        });

        logger.info(
            `[PopularPostJob] 총 ${popularPosts.length}개의 인기글 처리 완료`,
        );
    }

    private static calculateBaseScore(counts: {
        views: number;
        likes: number;
    }): number {
        return (
            counts.views * this.SCORE_WEIGHTS.VIEW +
            counts.likes * this.SCORE_WEIGHTS.LIKE
        );
    }

    private static applyTimeDecay(baseScore: number, createdAt: Date): number {
        const ageInHours =
            (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);
        return baseScore / Math.pow(ageInHours + 2, this.TIME_DECAY);
    }
}
