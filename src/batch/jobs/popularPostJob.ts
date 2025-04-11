import { logger } from "@/lib/logger";
import { PopularPostRepository } from "@/lib/repository/PopularPostRepository";

// src/batch/jobs/popularPostJob.ts
export class PopularPostJob {
    // 점수 계산 상수
    private static readonly SCORE_WEIGHTS = {
        VIEW: 1,
        LIKE: 2,
        COMMENT: 3,
    };

    private static readonly TIME_DECAY = 1.8;
    private static readonly repository = new PopularPostRepository();

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
        await this.repository.deleteAllPopularPosts();

        // 게시글 집계
        const posts = await this.repository.getRecentPosts(startDate);

        // 점수 계산 및 저장
        const popularPosts = posts.map((post) => {
            const baseScore = this.calculateBaseScore({
                views: post.views,
                likes: post.likes,
            });
            const finalScore = this.applyTimeDecay(baseScore, post.createdAt);
            logger.debug(
                `[PopularPostJob] 게시물 ${post.token}의 최종 점수: ${finalScore}`,
            );

            return {
                token: post.token,
                post_token: post.token,
                parent_menu_token: post.channel_item.parent_menu_token,
                submenu_token: post.channel_item.token,
                title: post.title,
                view_count: post.views,
                like_count: post.likes,
                score: finalScore,
                user_nickname: post.user.nickname,
                postCreatedAt: post.createdAt,
            };
        });

        // 배치 삽입
        await this.repository.createManyPopularPosts(popularPosts);

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
