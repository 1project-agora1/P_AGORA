import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { PostRepository } from "@/lib/repository/PostRepository";
import { PostCreateRequest } from "@/lib/request/PostRequest";
import { convertBigIntToString } from "@/util/ConvertBigIntToString";

export async function POST(request: Request) {
    try {
        const data: PostCreateRequest = await request.json();
        const postRepository = new PostRepository();
        const newPost = await postRepository.createPost(data);
        console.log(newPost);
        const responseData = convertBigIntToString(newPost);

        return Response.json(
            {
                success: true,
                data: responseData,
            } as ApiResponse<typeof responseData>,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("게시물 생성 에러", error);
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
