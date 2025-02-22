import { ApiResponse } from "@/lib/api-response";
import { convertBigIntToString } from "@/util/ConvertBigIntToString";
import { generateRandomToken } from "@/util/RandomToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = generateRandomToken();

    const newChannelItem = await prisma.channelItem.create({
      data: {
        parent_menu_token: data.parent_menu_token,
        parent_submenu_token: data?.parent_submenu_token,
        submenu_name: data.submenu_name,
        token: token,
        updatedAt: new Date(),
        createdAt: new Date(),
        url: data.url,
      },
    });
    const responseData = convertBigIntToString(newChannelItem);

    return Response.json(
      {
        success: true,
        data: responseData,
      } as ApiResponse<typeof responseData>,
      {
        status: 201,
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
    await prisma.$disconnect();
  }
}
