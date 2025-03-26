"use client";

import SubmitButton from "@/components/button/SubmitButton";
import { PostListMainForm } from "@/components/post/PostListMainForm";
import { ChannelItemData } from "@/lib/types/ChannelType";
import { pathDivided } from "@/util/PathDivider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Channel() {
    const pathname = usePathname();
    const { item3, item4 } = pathDivided(pathname);
    const channel = item3;
    const channelItemData: ChannelItemData = { token: item4 };

    return (
        <div>
            <div className="my-5">
                {/*TODO: 새로운 폼 적용 필요*/}
                <PostListMainForm channelItem={channelItemData} />
            </div>
            <Link href={`/channel/${channel}/${item4}/write`}>
                <SubmitButton buttonName="글쓰기" />
            </Link>
        </div>
    );
}
