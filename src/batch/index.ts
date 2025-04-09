import { logger } from "@/lib/logger";
import { BatchScheduler } from "./scheduler";

export class BatchApplication {
    static start() {
        try {
            logger.info("[BatchApplication] 배치 작업 스케줄러 시작");
            BatchScheduler.scheduleJobs();
            logger.info("[BatchApplication] 배치 작업 스케줄링 완료");
        } catch (error) {
            logger.error("[BatchApplication] 배치 작업 시작 중 오류:", error);
            process.exit(1);
        }
    }
}
