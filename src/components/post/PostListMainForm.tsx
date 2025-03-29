"use client";

import ErrorDisplay from "@/components/ErrorDisplay";
import {ApiResponse} from "@/lib/ApiResponse";
import {useLikePost} from "@/lib/hooks/postHook";
import {useUser} from "@/lib/hooks/useUser";
import {PostListResponse} from "@/lib/response/PostResponse";
import {ChannelItemData} from "@/lib/types/ChannelType";
import {ClockIcon, DocumentIcon, EyeIcon, HeartIcon,} from "@heroicons/react/24/outline";
import {Skeleton} from "@mui/material";
import {Post} from "@prisma/client";
import {formatDistanceToNow} from "date-fns";
import {ko} from "date-fns/locale";
import Link from "next/link";
import {useEffect, useState} from "react";

// 메인 페이지 게시물 리스트 폼
export function PostListMainForm({
                                     channelItem,
                                 }: {
    channelItem: ChannelItemData;
}) {
    return (
        <ChannelItemSection
            key={channelItem.token}
            token={channelItem.token}
        />
    );
}

function ChannelItemSection({token}: { token: string }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [channelItemInfo, setChannelItemInfo] = useState<{ channelToken: string, name: string | null }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const SKELETON_ITEMS = Array(3).fill(null);
    const {handleLikePost} = useLikePost();
    const {user} = useUser();
    useEffect(() => {
        const fetchPreviewData = async () => {
            try {
                if (!token) {
                    throw new Error("유효하지 않은 게시판 토큰");
                }

                const resPost = await fetch(`/api/post/list/preview/${token}`);
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

                const resChannelItemInfo = await fetch(
                    `/api/channel/item/info/${token}`
                );
                const {data} = await resChannelItemInfo.json();
                if (!data) {
                    throw new Error("게시판 이름 불러오기 실패");
                }

                setPosts(result.data.posts);
                setChannelItemInfo({
                        channelToken: data.channelToken,
                        name: data.name
                    }
                );

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
    }, [token]);

    const likeHandler = (token: string) => {
        if (user.token === "") {
            alert("로그인이 필요합니다.");
            return;
        }
        handleLikePost({
            userToken: user.token,
            postToken: token,
        });
    };

    return (
        <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-150">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">
                {channelItemInfo?.name}
            </h3>

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
            ) : posts.length === 0 ? (
                <div className="text-center py-3">
                    <DocumentIcon className="w-7 h-7 mx-auto text-gray-400"/>
                    <p className="text-gray-500 text-xs mt-1.5">
                        게시글이 없습니다
                    </p>
                </div>
            ) : (
                <div className="space-y-2">
                    {posts.map((post) => (
                        <article
                            key={post.token}
                            className="p-2 border border-gray-200 rounded-md
                            hover:bg-gray-50 transition-colors cursor-pointer flex justify-between"
                        >
                            {channelItemInfo?.channelToken ? (
                                <Link
                                    href={
                                        channelItemInfo?.channelToken
                                            ? `channel/${channelItemInfo.channelToken}/${token}/${post.token}`
                                            : "#"
                                    }
                                >
                                    <div className="flex justify-between items-center w-full">
                                        <h4 className="text-sm truncate font-medium text-gray-800">
                                            {post.title}
                                        </h4>
                                    </div>
                                </Link>
                            ) : (
                                <div className="flex justify-between items-center w-full">
                                    <h4 className="text-sm truncate font-medium text-gray-400">
                                        링크 생성 중...
                                    </h4>
                                </div>
                            )}
                            <div className="flex gap-1.5">
                                {/* 조회수 영역 */}
                                <div className="flex items-center gap-1 text-gray-500">
                                    <EyeIcon className="w-3.5 h-3.5 "/>
                                    <span className="text-[11px]">
                                        {post.views}
                                    </span>
                                </div>

                                {/* 좋아요 영역 */}
                                <div className="flex items-center gap-1 text-gray-500 z-999">
                                    <HeartIcon
                                        className="w-3.5 h-3.5 hover:text-red-600"
                                        onClick={() => likeHandler(post.token)}
                                    />
                                    <span className="text-[11px]">
                                        {post.likes}
                                    </span>
                                </div>

                                {/* 시간 표시 영역 */}
                                <div className="flex items-center gap-1 text-gray-500">
                                    <ClockIcon className="w-3.5 h-3.5"/>
                                    <span className="text-[11px]">
                                        {formatDistanceToNow(
                                            new Date(post.createdAt),
                                            {
                                                addSuffix: true,
                                                locale: ko,
                                            }
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
