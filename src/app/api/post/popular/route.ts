import { PopularPostRepository } from "@/lib/repository/PopularPostRepository";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const repository = new PopularPostRepository();
        const popularPosts = await repository.getPopularPosts();

        return NextResponse.json({
            status: 200,
            message: "인기글 조회 성공",
            data: popularPosts,
        });
    } catch (error) {
        console.error("인기글 조회 중 오류 발생:", error);
        return NextResponse.json(
            {
                status: 500,
                message: "인기글 조회 중 오류가 발생했습니다",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
}
