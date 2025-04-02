import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { PostRepository } from "@/lib/repository/PostRepository";
import { PostLikeRequest } from "@/lib/request/PostRequest";
import { IsLikedCountResponse } from "@/lib/response/PostResponse";

export async function GET(request: Request) {
    try {
        // URL에서 쿼리 파라미터 추출
        const url = new URL(request.url);
        const userToken = url.searchParams.get("userToken");
        const postToken = url.searchParams.get("postToken");
        console.log("userToken", userToken);
        console.log("postToken", postToken);
        // 파라미터 객체 생성
        // TODO: 매퍼 사용?
        const searchParams: PostLikeRequest = {
            userToken: userToken || "",
            postToken: postToken || "",
        };

        const postRepository = new PostRepository();

        const postList = await postRepository.isLikedPost(searchParams);

        return Response.json(
            {
                success: true,
                data: {
                    count: postList,
                },
            } as ApiResponse<IsLikedCountResponse>,
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("게시물 목록 조회 에러", error);
        // return Response.json(
        //     {
        //         success: false,
        //         error: "서버 에러",
        //     } as ApiResponse,
        //     { status: 500 },
        // );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
