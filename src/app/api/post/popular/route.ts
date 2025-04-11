import { PopularPostRepository } from "@/lib/repository/PopularPostRepository";
import { PostPopularRequest } from "@/lib/request/PostRequest";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

        const repository = new PopularPostRepository();

        const searchParams: PostPopularRequest = {
            page,
            pageSize,
        };
        const popularPosts = await repository.getPopularPosts(searchParams);
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
