"use client";

import { PostBestForm } from "@/components/post/PostBestForm";
import Cookies from "js-cookie";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

function ChannelContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
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
                <Suspense fallback={<div>로딩중...</div>}>
                    <PostBestForm />
                </Suspense>
            </div>
        </div>
    );
}

export default function Channel() {
    return (
        <Suspense fallback={<div>로딩중...</div>}>
            <ChannelContent />
        </Suspense>
    );
}
