"use client";

import { PostListMainForm } from "@/components/post/PostListMainForm";
import { ChannelItemData } from "@/lib/types/ChannerType";
import { pathDivided } from "@/util/PathDivider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostList() {
    const pathname = usePathname();
    const [channelItemData, setChannelItemData] = useState<ChannelItemData>(
        {} as ChannelItemData
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pathname) return;

        const { item5 } = pathDivided(pathname);
        setChannelItemData({
            token: item5,
        });
        setLoading(false);
    }, [pathname]);

    if (!pathname || loading) {
        return <div className="p-4">로딩 중...</div>;
    }

    return <PostListMainForm channelItem={channelItemData} />;
}
