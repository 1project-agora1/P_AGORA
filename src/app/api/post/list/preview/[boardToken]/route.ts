import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { PostRepository } from "@/lib/repository/PostRepository";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ boardToken: string }> }
) {
    try {
        const { boardToken } = await params;
        const postRepository = new PostRepository();
        const postList = await postRepository.findRecentPostPreList(boardToken);

        return Response.json(
            {
                success: true,
                data: postList,
            } as ApiResponse<[]>,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("게시물 목록 조회 에러", error);
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
