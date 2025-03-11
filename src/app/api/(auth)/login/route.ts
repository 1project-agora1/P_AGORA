import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { AuthenticationError } from "@/lib/errors/AuthError";
import { UserRepository } from "@/lib/repository/UserRepository";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const userRepository = new UserRepository();
        const user = await userRepository.findValidUserByEmailWithPassword(
            email,
            password
        );
        const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        if (!ACCESS_TOKEN) {
            throw new Error("환경변수를 확인해주세요.");
        }
        await userRepository.setCookie(ACCESS_TOKEN, user);

        return Response.json(
            {
                success: true,
            } as ApiResponse,
            { status: 200 }
        );
    } catch (error) {
        // 커스텀 에러
        if (error instanceof AuthenticationError) {
            return Response.json(
                { success: false, error: error.message },
                { status: 401 }
            );
        }

        console.error("로그인 에러", error);
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
