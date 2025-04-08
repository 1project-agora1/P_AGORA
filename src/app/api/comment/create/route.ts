import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { CommentCreateRequest } from "@/lib/request/CommentRequest";
import { CommentRepository } from "@/lib/repository/CommentRepository";

export async function POST(request: Request) {
    try {
        const data: CommentCreateRequest = await request.json();
        const commentRepository = new CommentRepository();
        const newComment = await commentRepository.createComment(data);

        return Response.json(
            {
                success: true,
                data: newComment,
            } as ApiResponse<typeof newComment>,
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("댓글 작성 에러", error);
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
            },
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
