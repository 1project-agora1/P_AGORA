import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { CommentRepository } from "@/lib/repository/CommentRepository";
import { CommentUpdateRequest } from "@/lib/request/CommentRequest";

export async function POST(request: Request) {
    try {
        const data: CommentUpdateRequest = await request.json();
        const commentRepository = new CommentRepository();
        const updatedComment = await commentRepository.updateComment(data);

        return Response.json(
            {
                success: true,
                data: updatedComment,
            } as ApiResponse<typeof updatedComment>,
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("댓글 수정 에러", error);
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
