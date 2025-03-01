import {PrismaClientManager} from "@/lib/client/PrismaClientManager";
import {PostRepository} from "@/lib/repository/PostRepository";
import {ApiResponse} from "@/lib/ApiResponse";

export async function GET({params}: { params: { postToken: string } }) {
    try {
        const postRepository = new PostRepository()
        const {postToken} = params;

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
        console.error("게시물 목록 조회 에러", error);
        return Response.json(
            {
                success: false,
                error: "서버 에러",
            } as ApiResponse,
            {status: 500}
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
