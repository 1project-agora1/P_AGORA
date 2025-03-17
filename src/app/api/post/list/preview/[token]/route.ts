import {ApiResponse} from "@/lib/ApiResponse";
import {PrismaClientManager} from "@/lib/client/PrismaClientManager";
import {PostRepository} from "@/lib/repository/PostRepository";
import {PostPreviewRequest} from "@/lib/request/PostRequest";
import {PostListResponse} from "@/lib/response/PostResponse";

export async function GET(
    request: Request,
    {params}: { params: Promise<{ token: string }> },
) {
    try {
        const {token} = await params;
        // URL에서 쿼리 파라미터 추출
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10); // 기본값 1
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10); // 기본값 10

        // 파라미터 객체 생성
        // TODO: 매퍼 사용?
        const searchParams: PostPreviewRequest = {
            channel_item_token: token,
            page,
            pageSize,
        };

        const postRepository = new PostRepository();

        const postList = await postRepository.findRecentPostPreList(searchParams);

        return Response.json(
            {
                success: true,
                data: {
                    posts: postList.data,
                    totalCount: postList.totalCount,
                    totalPages: postList.totalPages,
                },
            } as ApiResponse<PostListResponse>,
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("게시물 목록 조회 에러", error);
        return Response.json(
            {
                success: false,
                error: "서버 에러",
            } as ApiResponse,
            {status: 500},
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
