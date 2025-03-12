import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { ChannelRepository } from "@/lib/repository/ChannelRepository";
import { ChannelItemCreateRequest } from "@/lib/request/ChannelRequest";

export async function POST(request: Request) {
    try {
        const data: ChannelItemCreateRequest = await request.json();

        const channelRepository = new ChannelRepository();

        const newChannelItem = await channelRepository.createItemChannel(data);

        return Response.json(
            {
                success: true,
                data: newChannelItem,
            } as ApiResponse<typeof newChannelItem>,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("채널 아이템 생성 에러", error);
        return Response.json(
            {
                success: false,
                error: "서버 에러",
            } as ApiResponse,
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
