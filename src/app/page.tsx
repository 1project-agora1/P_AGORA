"use client";

import { PostListMainForm } from "@/components/post/PostListMainForm";
import { CookiesProvider } from "next-client-cookies";
import { Suspense } from "react";

// 채널 아이템 데이터 인터페이스
interface ChannelItemData {
    token: string;
}

export default function Home() {
    // TODO: 메인 페이지에 보여줄 채널 아이템 로직 추가 예정 - 현재는 로컬 DB 더미 데이터 사용
    // TODO: 추가 페이지 할당 예정
    const firstToken: string = process.env.NEXT_PUBLIC_MAIN_CI_TOKEN1 ?? "";
    const mainChannels: ChannelItemData[] = [
        {token: firstToken}
    ]

    return (
        <main className="container mx-auto p-4 bg-white min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {/* 반응형 col 기본값 : 모바일(1col), 태블릿(2col), 데스크탑(3col)*/}
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
