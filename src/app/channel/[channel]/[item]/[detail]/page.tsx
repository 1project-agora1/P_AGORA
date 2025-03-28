"use client";

import DeleteButton from "@/components/button/DeleteButton";
import NavButton from "@/components/button/NavButton";
import SubmitButton from "@/components/button/SubmitButton";
import PostDetail from "@/components/post/PostDetail";
import { PostDetailTypes } from "@/lib/types/PostType";
import { UserType } from "@/lib/types/UserType";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const channel = segments[2];
    const item = segments[3];
    const post = segments[4];
    const [data, setData] = useState<PostDetailTypes>();
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/post/detail?postToken=${post}`);
                const data = await res.json();
                setData(data.data);

                const userToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
                const cookieValue = Cookies.get(userToken);
                if (cookieValue) {
                    try {
                        const decoded = jwt.decode(cookieValue) as UserType; // 🔹 클라이언트에서는 검증하지 않고 decode만!
                        if (
                            decoded &&
                            decoded.token === data?.data.user_token
                        ) {
                            setIsOwner(true);
                        }
                    } catch (error) {
                        console.error("Token decode error:", error);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch post data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [post]);
    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    const handleNavi = () => {
        location.href = `/channel/${channel}/${item}/${post}/edit`;
    };
    const handleDelete = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        const res = await fetch(`/api/post/delete?token=${post}`, {
            method: "DELETE",
        });
        if (res.ok) {
            location.href = `/channel/${channel}/${item}`;
        } else {
            console.error("Failed to delete post");
        }
    };
    return (
        <>
            {data && <PostDetail data={data} />}
            <footer className="flex justify-end my-2">
                <NavButton
                    url={`/channel/${channel}/${item}`}
                    label="목록으로"
                    style="mr-2"
                />
                {isOwner && (
                    <>
                        <DeleteButton
                            buttonName="삭제하기"
                            onClick={handleDelete}
                            style="mr-2"
                        />
                        <SubmitButton
                            buttonName="수정하기"
                            onClick={handleNavi}
                        />
                    </>
                )}
            </footer>
        </>
    );
}
