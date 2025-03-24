import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { PostRepository } from "@/lib/repository/PostRepository";

export async function DELETE(request: Request) {
    try {
        const postRepository = new PostRepository();
        const url = new URL(request.url);
        const token = url.searchParams.get("token");
        if (!token) {
            return Response.json(
                {
                    success: false,
                    error: "토큰이 필요합니다.",
                } as ApiResponse,
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        const newPost = await postRepository.deletePost(token);

        return Response.json(
            {
                success: true,
                data: newPost,
            } as ApiResponse<typeof newPost>,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("게시물 삭제 에러", error);
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
