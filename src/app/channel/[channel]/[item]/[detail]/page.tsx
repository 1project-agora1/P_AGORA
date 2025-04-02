"use client";

import DeleteButton from "@/components/button/DeleteButton";
import NavButton from "@/components/button/NavButton";
import SubmitButton from "@/components/button/SubmitButton";
import PostDetail from "@/components/post/PostDetail";
import { ShareModal } from "@/components/share/ShareModal";
import { PostDetailAllotType } from "@/lib/types/PostType";
import { UserType } from "@/lib/types/UserType";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DetailPage() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const channel = segments[2];
    const item = segments[3];
    const post = segments[4];
    const [data, setData] = useState<PostDetailAllotType>();
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
        const confirmToast = toast(
            ({ closeToast }) => (
                <div className="p-4">
                    <p className="text-lg font-semibold text-gray-800 mb-4">
                        정말 삭제하시겠습니까?
                    </p>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-1 rounded shadow-md transition duration-200"
                            onClick={async () => {
                                closeToast(); // 토스트 닫기
                                try {
                                    const res = await fetch(
                                        `/api/post/delete?token=${post}`,
                                        {
                                            method: "DELETE",
                                        }
                                    );
                                    if (res.ok) {
                                        toast.success(
                                            "게시글이 성공적으로 삭제되었습니다."
                                        );
                                        location.href = `/channel/${channel}/${item}?state=deleteSuccess`;
                                    } else {
                                        toast.error(
                                            "게시글 삭제에 실패했습니다."
                                        );
                                    }
                                } catch (error) {
                                    console.error(
                                        "삭제 요청 중 오류 발생:",
                                        error
                                    );
                                    toast.error(
                                        "서버 오류로 인해 삭제에 실패했습니다."
                                    );
                                }
                            }}
                        >
                            삭제
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-1 rounded shadow-md transition duration-200"
                            onClick={() => closeToast()} // 취소 버튼 클릭 시 토스트 닫기
                        >
                            취소
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false, // 자동 닫힘 비활성화
                closeOnClick: false, // 클릭 시 닫히지 않도록 설정
                position: "top-center", // 토스트 위치 설정
            }
        );
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
                            style="mr-2"
                        />
                    </>
                )}
                <ShareModal />
            </footer>
        </>
    );
}
