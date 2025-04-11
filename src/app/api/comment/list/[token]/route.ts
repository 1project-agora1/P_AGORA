import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { CommentRepository } from "@/lib/repository/CommentRepository";
import { CommentListResponse } from "@/lib/response/CommentResponse";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ token: string }> },
) {
    try {
        const { token } = await params;

        const commentRepository = new CommentRepository();
        const comments = await commentRepository.findCommentsFromPost(token);

        return Response.json(
            {
                success: true,
                data: comments,
            } as unknown as ApiResponse<CommentListResponse>,
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("댓글 목록 조회 에러", error);
        return Response.json(
            {
                success: false,
                error: "서버 에러",
            } as ApiResponse,
            { status: 500 },
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
