import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { generateRandomToken } from "@/util/RandomToken";
import { ViewLogRequest } from "../request/ViewLogRequest";

export class ViewLogQuery {
    countViewLog(data: ViewLogRequest) {
        const prisma = PrismaClientManager.getClient();
        return prisma.viewLog.count({
            where: {
                ip: data.ip,
                post_token: data.postToken,
            },
        });
    }

    createViewLog(data: ViewLogRequest) {
        const prisma = PrismaClientManager.getClient();
        const token = generateRandomToken();

        const viewLog = {
            token: token,
            post_token: data.postToken,
            ip: data.ip,
            updatedAt: new Date(),
            createdAt: new Date(),
        };
        return prisma.viewLog.create({
            data: viewLog,
        });
    }
}
