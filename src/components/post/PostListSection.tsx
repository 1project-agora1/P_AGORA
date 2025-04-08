import ErrorDisplay from "@/components/ErrorDisplay";
import { ApiResponse } from "@/lib/ApiResponse";
import { PostListResponse } from "@/lib/response/PostResponse";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Skeleton } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PostListSection({ token }: { token: string }) {
    const [posts, setPosts] = useState<PostListResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1); // 현재 페이지 상태
    const [pageSize] = useState(10); // 페이지당 게시물 수 (고정값)
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
    const SKELETON_ITEMS = Array(5).fill(null);

    useEffect(() => {
        const fetchPreviewData = async () => {
            try {
                if (!token) {
                    throw new Error("유효하지 않은 게시판 토큰");
                }

                // 게시물 데이터 가져오기
                const resPost = await fetch(
                    `/api/post/list/preview/${token}?page=${page}&pageSize=${pageSize}`,
                );
                if (!resPost.ok) {
                    throw new Error(`HTTP ${resPost.status}`);
                }

                const contentType = resPost.headers.get("content-type");
                if (!contentType?.includes("application/json")) {
                    throw new Error("유효하지 않은 응답 형식");
                }

                const result: ApiResponse<PostListResponse> =
                    await resPost.json();
                if (!result.success || !result.data) {
                    throw new Error(result.error || "데이터 불러오기 실패");
                }

                // 상태 업데이트
                setPosts(result.data);
                setTotalPages(result.data.totalPages); // 총 페이지 수 설정
                setError(null);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "알 수 없는 오류 발생";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchPreviewData();
    }, [token, page]);

    return (
        <>
            {/* 로딩 상태 */}
            {loading ? (
                <div className="space-y-3">
                    {SKELETON_ITEMS.map((_, i) => (
                        <Skeleton
                            key={`skeleton-${i}`}
                            className="h-12 rounded-md"
                        />
                    ))}
                </div>
            ) : error ? (
                // 에러 상태
                <ErrorDisplay
                    title="데이터 로딩 실패"
                    message={error}
                    retryFn={() => window.location.reload()}
                />
            ) : posts?.posts.length === 0 ? (
                // 게시물이 없을 때
                <div className="text-center py-6">
                    <DocumentIcon className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="text-gray-500 text-sm mt-2">
                        게시글이 없습니다
                    </p>
                </div>
            ) : (
                // 게시물 목록
                <>
                    <table className="w-full border-collapse border border-gray-200 text-sm text-left">
                        <thead>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="px-4 py-2">게시 날짜</th>
                                <th className="px-4 py-2">게시물 이름</th>
                                <th className="px-4 py-2">작성자</th>
                                <th className="px-4 py-2">조회수</th>
                                <th className="px-4 py-2">좋아요</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts?.posts.map((post) => (
                                <tr
                                    key={post.token}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    {/* 게시 날짜 */}
                                    <td className="px-4 py-2 text-gray-600">
                                        {formatDistanceToNow(
                                            new Date(post.createdAt),
                                            {
                                                addSuffix: true,
                                                locale: ko,
                                            },
                                        )}
                                    </td>

                                    {/* 게시물 이름 */}
                                    <td className="px-4 py-2 text-blue-600 font-medium truncate">
                                        <Link href={`${token}/${post.token}`}>
                                            {post.title}
                                        </Link>
                                    </td>

                                    {/* 작성자 */}
                                    <td className="px-4 py-2 text-gray-600">
                                        {loading
                                            ? "Loading..."
                                            : post.nickname || "Unknown"}
                                    </td>

                                    {/* 조회수 */}
                                    <td className="px-4 py-2 text-gray-600">
                                        {post.views}
                                    </td>

                                    {/* 좋아요 */}
                                    <td className="px-4 py-2 text-gray-600">
                                        {post.likes}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* 페이지네이션 */}
                    <div className="flex justify-center mt-4 space-x-1">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index + 1)}
                                className={`px-3 py-1 border border-gray-300 rounded-md ${
                                    page === index + 1 ? "bg-blue-100" : ""
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
