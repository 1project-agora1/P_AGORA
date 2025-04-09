"use client";

import ErrorDisplay from "@/components/ErrorDisplay";
import { usePost } from "@/lib/hooks/postHook";
import { PopularPost } from "@/lib/types/PopularPostType";
import {
    ClockIcon,
    DocumentIcon,
    EyeIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";
import { Skeleton } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";

export function PostListBestForm() {
    const [posts, setPosts] = useState<PopularPost[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const SKELETON_ITEMS = Array(3).fill(null);
    const { getPopularPostsHook } = usePost();

    useEffect(() => {
        const fetchPreviewData = async () => {
            try {
                const resPost = await getPopularPostsHook();
                setPosts(resPost?.data.data);
                setError(null);
            } catch (err) {
                const errorMessage =
                    err instanceof Error ? err.message : "알 수 없는 오류 발생";
                setError(errorMessage);
                console.error("데이터 패칭 에러:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPreviewData();
    }, []);

    return (
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-150">
            <Link href={`/channel/best`}>
                <h3 className="text-lg font-semibold mb-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                    실시간 인기글
                </h3>
            </Link>

            {loading ? (
                <div className="space-y-2">
                    {SKELETON_ITEMS.map((_, i) => (
                        <Skeleton
                            key={`skeleton-${i}`}
                            className="h-10 rounded-md"
                        />
                    ))}
                </div>
            ) : error ? (
                <ErrorDisplay
                    title="데이터 로딩 실패"
                    message={error}
                    retryFn={() => window.location.reload()}
                />
            ) : posts?.length === 0 ? (
                <div className="text-center py-3">
                    <DocumentIcon className="w-7 h-7 mx-auto text-gray-400" />
                    <p className="text-gray-500 text-xs mt-1.5">
                        게시글이 없습니다
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {posts?.map((post) => (
                        <article
                            key={post.token}
                            className="p-2 border border-gray-200 rounded-md
                            hover:bg-gray-50 transition-colors cursor-pointer flex justify-between"
                        >
                            <Link
                                href={`channel/${post.parent_menu_token}/${post.submenu_token}/${post.token}`}
                            >
                                <div className="flex justify-between items-center w-full">
                                    <h4 className="text-sm truncate font-medium text-gray-800">
                                        {post.title}
                                    </h4>
                                </div>
                            </Link>

                            <div className="flex gap-1.5">
                                {/* 조회수 영역 */}
                                <div className="flex items-center gap-1 text-gray-500">
                                    <EyeIcon className="w-3.5 h-3.5 " />
                                    <span className="text-[11px]">
                                        {post.view_count}
                                    </span>
                                </div>

                                {/* 좋아요 영역 */}
                                <div className="flex items-center gap-1 text-gray-500 z-999">
                                    <HeartIcon className="w-3.5 h-3.5" />
                                    <span className="text-[11px]">
                                        {post.like_count}
                                    </span>
                                </div>

                                {/* 시간 표시 영역 */}
                                <div className="flex items-center gap-1 text-gray-500">
                                    <ClockIcon className="w-3.5 h-3.5" />
                                    <span className="text-[11px]">
                                        {formatDistanceToNow(
                                            new Date(post.postCreatedAt),
                                            {
                                                addSuffix: true,
                                                locale: ko,
                                            },
                                        )}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
