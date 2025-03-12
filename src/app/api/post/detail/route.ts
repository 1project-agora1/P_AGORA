import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { PostRepository } from "@/lib/repository/PostRepository";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const postToken = url.searchParams.get("postToken");
    if (!postToken) {
        return new Response(
            JSON.stringify({
                success: false,
                error: "postToken이 필요합니다.",
            } as ApiResponse),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    try {
        const postRepository = new PostRepository();
        const post = await postRepository.findPostDetail(postToken);

        return Response.json(
            {
                success: true,
                data: post,
            } as ApiResponse,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(`게시물 조회 에러 - postToken: ${postToken}`, error);
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
