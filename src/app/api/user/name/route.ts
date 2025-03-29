import {ApiResponse} from "@/lib/ApiResponse";
import {PrismaClientManager} from "@/lib/client/PrismaClientManager";
import {UserRepository} from "@/lib/repository/UserRepository";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userToken = url.searchParams.get("userToken");
    if (!userToken) {
        return new Response(
            JSON.stringify({
                success: false,
                error: "userToken이 필요합니다.",
            } as ApiResponse),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    try {
        const userRepository = new UserRepository();
        const user = await userRepository.findUserNameByToken(userToken);

        return Response.json(
            {
                success: true,
                data: user,
            } as ApiResponse,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(`유저 이름 조회 에러 - userToken: ${userToken}`, error);
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
