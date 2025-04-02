"use client";

import { useEffect, useState } from "react";
import { ChannelItemData } from "@/lib/types/ChannelType";
import { PostListSection } from "@/components/post/PostListSection";

export function PostListForm({
    channelItem,
}: {
    channelItem: ChannelItemData;
}) {
    return (
        <div className="p-4">
            {/* 채널 아이템 정보 */}
            <div className="bg-blue-100 p-3 rounded-md shadow-sm mb-4">
                <ChannelItemSection token={channelItem.token} />
            </div>

            {/* 게시물 목록 */}
            <div className="bg-white p-3 rounded-md shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    게시글 목록
                </h2>
                <PostListSection token={channelItem.token} />
            </div>
        </div>
    );
}

function ChannelItemSection({ token }: { token: string }) {
    const [channelItemInfo, setChannelItemInfo] = useState<{
        channelToken: string;
        name: string | null;
    }>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPreviewData = async () => {
            try {
                if (!token) {
                    throw new Error("유효하지 않은 게시판 토큰");
                }

                const resChannelItemInfo = await fetch(
                    `/api/channel/item/info/${token}`,
                );
                const { data } = await resChannelItemInfo.json();
                if (!data) {
                    throw new Error("게시판 이름 불러오기 실패");
                }

                setChannelItemInfo({
                    channelToken: data.channelToken,
                    name: data.name,
                });
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

    return (
        <h2 className="text-3xl font-semibold text-gray-700 mb-1">
            <span className="text-blue-900">
                {channelItemInfo?.name} 게시판
            </span>
        </h2>
    );
}
