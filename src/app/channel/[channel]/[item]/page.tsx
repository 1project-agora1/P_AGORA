"use client";

import SubmitButton from "@/components/button/SubmitButton";
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
                {/*TODO: 다른 PR 에서 새로운 Form 작성 예정*/}
                {/*<PostListForm channelItems={channelItemData}/>*/}
            </div>
            <Link href={`/channel/${channel}/${channelItemData}/write`}>
                <SubmitButton buttonName="글쓰기"/>
            </Link>
        </div>
    );
}
