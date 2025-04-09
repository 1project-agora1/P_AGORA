import { logger } from "@/lib/logger";
import { PrismaClient } from "@prisma/client";

// Next.js 개발 환경에서 핫 리로딩으로 인해 여러 인스턴스가 생성되는 것을 방지
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export class PrismaClientManager {
    private static instance: PrismaClient;

    static getClient(): PrismaClient {
        if (!PrismaClientManager.instance) {
            if (process.env.NODE_ENV === "production") {
                PrismaClientManager.instance = new PrismaClient();
            } else {
                if (!globalForPrisma.prisma) {
                    globalForPrisma.prisma = new PrismaClient();
                }
                PrismaClientManager.instance = globalForPrisma.prisma;
            }
        }
        return PrismaClientManager.instance;
    }

    static async shutdown() {
        if (PrismaClientManager.instance) {
            try {
                await PrismaClientManager.instance.$disconnect();
                logger.info("[PrismaClientManager] 데이터베이스 연결 종료");
            } catch (error) {
                logger.error(
                    "[PrismaClientManager] 데이터베이스 연결 종료 중 오류:",
                    error,
                );
            } finally {
                PrismaClientManager.instance = null!;
            }
        }
    }
}
