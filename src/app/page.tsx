"use client";

import { PostListBestForm } from "@/components/post/PostListBestForm";
import { PostListMainForm } from "@/components/post/PostListMainForm";
import { useChannelItem } from "@/lib/hooks/channelHook";
import { CookiesProvider } from "next-client-cookies";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

// 채널 아이템 데이터 인터페이스
interface ChannelItemData {
    token: string;
}

function HomeContent() {
    const { channelItemTokenList } = useChannelItem();
    const [mainChannels, setMainChannels] = useState<ChannelItemData[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const success = searchParams.get("success");

    useEffect(() => {
        const fetchChannelItemTokenList = async () => {
            const response = await channelItemTokenList();
            if (response?.data) {
                setMainChannels(response.data as ChannelItemData[]);
            }
        };
        fetchChannelItemTokenList();
        if (success) {
            toast.success("회원가입이 완료되었습니다!");
            router.push("/");
        }
    }, [success]);

    return (
        <main className="container mx-auto p-4 bg-white min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {/* 반응형 col 기본값 : 모바일(1col), 태블릿(2col), 데스크탑(3col)*/}
                <PostListBestForm />
                {mainChannels.map((channel) => (
                    <Suspense
                        key={channel.token}
                        fallback={
                            <div className="p-4 bg-gray-100 rounded-lg">
                                로딩 중...
                            </div>
                        }
                    >
                        <CookiesProvider value={[]}>
                            <PostListMainForm
                                channelItem={{ token: channel.token }}
                            />
                        </CookiesProvider>
                    </Suspense>
                ))}
            </div>
        </main>
    );
}

export default function Home() {
    return (
        <Suspense fallback={<div>로딩중...</div>}>
            <HomeContent />
        </Suspense>
    );
}
