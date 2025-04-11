import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { ChannelRepository } from "@/lib/repository/ChannelRepository";

export async function GET() {
    try {
        //TODO : 채널 아이템 목록 리스트 조회 시 limit 추가 순서 관련 로직 개선 필요
        const channelRepository = new ChannelRepository();

        const channels = await channelRepository.getChannelItemList();

        return Response.json(
            {
                success: true,
                data: channels,
            } as ApiResponse<typeof channels>,
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("채널 목록 조회 에러", error);
        return Response.json(
            {
                success: false,
                error: "서버 에러",
            } as ApiResponse,
            { status: 500 },
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
