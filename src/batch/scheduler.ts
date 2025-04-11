import { logger } from "@/lib/logger";
import schedule from "node-schedule";
import { PopularPostJob } from "./jobs/popularPostJob";

export class BatchScheduler {
    static scheduleJobs() {
        // 매시간 실행
        // 30분 마다 실행
        schedule.scheduleJob("*/30 * * * *", async () => {
            try {
                await PopularPostJob.execute();
            } catch (error) {
                logger.error("[BatchScheduler] 인기글 집계 실패:", error);
            }
        });
    }
}
