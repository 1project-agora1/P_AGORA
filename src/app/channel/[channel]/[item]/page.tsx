"use client";

import SubmitButton from "@/components/button/SubmitButton";
import { PostListForm } from "@/components/post/PostListForm";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Channel() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const channel = segments[2];
    const item = segments[3];

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
