import {ApiResponse} from "@/lib/ApiResponse";
import {PrismaClientManager} from "@/lib/client/PrismaClientManager";
import {ChannelItemRepository} from "@/lib/repository/ChannelItemRepository";

export async function GET(
    req: Request,
    {params}: { params: { token: string } }
) {
    const {token: channelItemToken} = params;
    try {
        const channelItemRepository = new ChannelItemRepository();
        const channelItem = await channelItemRepository.findChannelItemName(channelItemToken);
        if (!channelItem) {
            return Response.json(
                {
                    success: false,
                    error: "게시판 조회 실패",
                } as ApiResponse,
                {status: 404}
            )
        }

        return Response.json(
            {
                success: true,
                data: {name: channelItem.submenu_name},
            } as ApiResponse<{ name: string }>,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(`게시판 이름 조회 에러 - boardToken : ${channelItemToken}`, error);
        return Response.json(
            {
                success: false,
                error: "서버 에러",
            } as ApiResponse,
            {status: 500}
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
