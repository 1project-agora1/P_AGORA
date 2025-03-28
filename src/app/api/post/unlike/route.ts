import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { PostRepository } from "@/lib/repository/PostRepository";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const postRepository = new PostRepository();
        const likePost = await postRepository.unLikePost(data);
        return Response.json(
            {
                success: true,
                data: likePost,
            } as ApiResponse<typeof likePost>,
            {
                status: 200,
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
