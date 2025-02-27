import { generateRandomToken } from "@/util/RandomToken";
import { PrismaClientManager } from "../client/PrismaClientManager";
import {
    ChannelCreateRequest,
    ChannelItemCreateRequest,
} from "../request/ChannelRequest";

export class ChannelQeury {
    async getChannelList() {
        const prisma = PrismaClientManager.getClient();
        return await prisma.channel.findMany({
            select: {
                token: true,
                menu_name: true,
                url: true,
                channelItems: {
                    select: {
                        id: false,
                        parent_menu_token: true,
                        parent_submenu_token: true,
                        submenu_name: true,
                        url: true,
                        token: true,
                    },
                },
            },
        });
    }

    async createItemChannel(request: ChannelItemCreateRequest) {
        const prisma = PrismaClientManager.getClient();
        const token = generateRandomToken();

        return await prisma.channelItem.create({
            data: {
                parent_menu_token: request.parent_menu_token,
                parent_submenu_token: request?.parent_submenu_token,
                submenu_name: request.submenu_name,
                token: token,
                updatedAt: new Date(),
                createdAt: new Date(),
                url: request.url,
            },
        });
    }

    async createChannel(request: ChannelCreateRequest) {
        const prisma = PrismaClientManager.getClient();
        const token = generateRandomToken();
        return await prisma.channel.create({
            data: {
                menu_name: request.menu_name,
                token: token,
                updatedAt: new Date(),
                createdAt: new Date(),
                url: "/channel" + request.url,
            },
        });
    }
}
