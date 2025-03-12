import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { ChannelRepository } from "@/lib/repository/ChannelRepository";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const channelToken = searchParams.get("channelToken");
        const itemToken = searchParams.get("itemToken");

        if (!channelToken || !itemToken) {
            return Response.json(
                {
                    success: false,
                    error: "잘못된 요청",
                } as ApiResponse,
                { status: 400 }
            );
        }
        const channelRepository = new ChannelRepository();

        const channels = await channelRepository.getChannel(
            channelToken,
            itemToken
        );
        if (channels == null) {
            return Response.json(
                {
                    success: true,
                    data: [],
                } as ApiResponse<[]>,
                { status: 200 }
            );
        }

        return Response.json(
            {
                success: true,
                data: channels,
            } as ApiResponse<typeof channels>,

            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("채널 목록 조회 에러", error);
        return Response.json(
            {
                success: false,
                error: "서버 에러",
            } as ApiResponse,
            { status: 500 }
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
