import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { ChannelRepository } from "@/lib/repository/ChannelRepository";
import { convertBigIntToString } from "@/util/ConvertBigIntToString";

export async function GET() {
  try {
    const channelRepository = new ChannelRepository();

    const channels = await channelRepository.getChannelList();

    const responseData = convertBigIntToString(channels);

    return Response.json(
      {
        success: true,
        data: responseData,
      } as ApiResponse<typeof responseData>,
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
