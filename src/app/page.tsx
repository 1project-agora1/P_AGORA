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
    // .env 에서 메인 페이지에 띄울 채널 아이템
    /*const channelItemNums = [1, 2, 3, 4, 5, 6]; // 필요한 채널 번호 배열
    const mainChannels: ChannelItemData[] = channelItemNums.map((num) => {
        const envKey = `NEXT_PUBLIC_MAIN_CI_TOKEN${num}`;
        return { token: getEnvVariable(envKey) };
    });*/
    const mainChannels: ChannelItemData[] = [{ token: "681e78acf059ae1" }];

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
