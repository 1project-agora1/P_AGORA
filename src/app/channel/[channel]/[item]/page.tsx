"use client";

import SubmitButton from "@/components/button/SubmitButton";
import { PostListForm } from "@/components/post/PostListForm";
import { ChannelItemData } from "@/lib/types/ChannelType";
import { pathDivided } from "@/util/PathDivider";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Channel() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { item3, item4 } = pathDivided(pathname);
    const channel = item3;
    const channelItemData: ChannelItemData = { token: item4 };
    const state = searchParams.get("state");
    const userToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
    const cookieValue = Cookies.get(userToken);
    const [writeBtn, setWriteBtn] = useState(false);
    useEffect(() => {
        if (state === "saveSuccess") {
            toast.success("게시글을 성공적으로 작성하였습니다.");
        } else if (state === "deleteSuccess") {
            toast.success("게시글을 삭제하였습니다.");
        } else if (state === "editSuccess") {
            toast.success("게시글을 성공적으로 수정하였습니다.");
        }
        if (cookieValue) {
            setWriteBtn(true);
        }
    }, [state]);
    return (
        <div>
            <div className="my-5">
                <PostListForm channelItem={channelItemData} />
            </div>
            {writeBtn && (
                <Link href={`/channel/${channel}/${item4}/write`}>
                    <SubmitButton buttonName="글쓰기" />
                </Link>
            )}
        </div>
    );
}
