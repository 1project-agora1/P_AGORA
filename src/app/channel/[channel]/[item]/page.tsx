"use client";

import SubmitButton from "@/components/button/SubmitButton";
import {PostListForm} from "@/components/post/PostListForm";
import {pathDivided} from "@/util/PathDivider";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";

interface ChannelItemData {
    token: string;
}

export default function Channel() {
    const pathname = usePathname();
    const {item3, item4} = pathDivided(pathname);
    const channel = item3;
    const [channelItemData, setChannelItemData] = useState<ChannelItemData[]>([])

    setChannelItemData([{
        token: item4
    }])

    return (
        <div>
            <div className="my-5">
                <PostListForm channelItems={channelItemData}/>
            </div>
            <Link href={`/channel/${channel}/${channelItemData}/write`}>
                <SubmitButton buttonName="글쓰기"/>
            </Link>
        </div>
    );
}
