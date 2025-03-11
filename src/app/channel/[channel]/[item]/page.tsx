"use client";

import SubmitButton from "@/components/button/SubmitButton";
import { PostListForm } from "@/components/post/PostListForm";
import { pathDivided } from "@/util/PathDivider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Channel() {
    const pathname = usePathname();
    const { item3, item4 } = pathDivided(pathname);
    const channel = item3;
    const item = item4;

    return (
        <div>
            <div className="my-5">
                <PostListForm boardToken={item} />
            </div>
            <Link href={`/channel/${channel}/${item}/write`}>
                <SubmitButton buttonName="글쓰기" />
            </Link>
        </div>
    );
}
