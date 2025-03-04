import { ApiResponse } from "@/lib/ApiResponse";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { DuplicateUserError } from "@/lib/errors/AuthError";
import { ImageRepository } from "@/lib/repository/ImageRepository";

interface imageUrlType {
    imageUrl: string;
}

export async function POST(request: Request) {
    try {
        const imageRepository = new ImageRepository();

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return Response.json(
                {
                    success: false,
                    error: "파일이 제공되지 않았습니다.",
                } as ApiResponse,
                { status: 400 }
            );
        }

        const imageUrl = await imageRepository.uploadImage(file);
        const responseData = { imageUrl };
        return Response.json(
            {
                success: true,
                data: responseData,
            } as ApiResponse<imageUrlType>,
            { status: 200 }
        );
    } catch (error) {
        // 커스텀 에러
        if (error instanceof DuplicateUserError) {
            return Response.json(
                { success: false, error: error.message },
                { status: 403 }
            );
        }

        console.error("이미지 업로드 에러", error);
        return Response.json(
            {
                success: false,
                error: "이미지 업로드 중 오류 발생",
            } as ApiResponse,
            { status: 500 }
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
