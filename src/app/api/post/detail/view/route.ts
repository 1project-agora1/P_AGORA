import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { PostRepository } from "@/lib/repository/PostRepository";
import { ViewLogRepository } from "@/lib/repository/ViewlogRepository";
import { ViewLogRequest } from "@/lib/request/ViewLogRequest";

export async function POST(request: Request) {
    try {
        const postRepository = new PostRepository();
        const viewLogRepository = new ViewLogRepository();
        const data = await request.json();

        let ip =
            request.headers.get("x-forwarded-for")?.split(",")[0] || // 프록시 뒤에 있을 경우
            request.headers.get("x-real-ip") || // 일부 프록시 환경에서 사용
            "127.0.0.1";

        // IPv6 로컬호스트(::1)를 IPv4 로컬호스트(127.0.0.1)로 변환
        if (ip === "::1") {
            ip = "127.0.0.1";
        }
        let status = 200;
        const postToken = data.postToken;

        const viewLogRequest: ViewLogRequest = {
            ip: ip,
            postToken: postToken,
        };

        // ip와 해당 게시물 토큰을 이용해 조회
        // 없다면 조회수 증가 & view_log에 추가 & 200
        const viewLog = await viewLogRepository.countViewLog(viewLogRequest);
        if (viewLog === 0) {
            await viewLogRepository.createViewLog(viewLogRequest);
            await postRepository.viewPost(data);
            status = 200;
        } else {
            status = 201;
        }
        // 있다면 그냥 리턴 & 201
        return Response.json(
            {
                success: true,
                status: status,
            } as ApiResponse,
            {
                status: status,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error(error);
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
