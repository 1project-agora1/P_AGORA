import { ApiResponse } from "@/lib/api-response";
import { convertBigIntToString } from "@/util/ConvertBigIntToString";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const channels = await prisma.channel.findMany({
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
    await prisma.$disconnect();
  }
}
