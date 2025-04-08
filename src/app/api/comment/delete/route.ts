import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { CommentRepository } from "@/lib/repository/CommentRepository";
import { CommentDeleteRequest } from "@/lib/request/CommentRequest";

// TODO: DELETE->POST 후에 상태 변경으로 안 보이게 처리해서 삭제 기능 구현 필요
export async function DELETE(request: Request) {
    try {
        const data: CommentDeleteRequest = await request.json();
        const commentRepository = new CommentRepository();
        const deletedComment = await commentRepository.deleteComment(data);

        return Response.json(
            {
                success: true,
                data: deletedComment,
            } as ApiResponse<typeof deletedComment>,
            {
                status: 200,
            },
        );
    } catch (error) {
        console.error("댓글 삭제 에러", error);
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
