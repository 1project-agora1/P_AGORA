"use client";
import { useLikePost } from "@/lib/hooks/postHook";
import { useUser } from "@/lib/hooks/useUser";
import { PostDetailType } from "@/lib/types/PostType";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";

const PostDetail: React.FC<PostDetailType> = ({ data }) => {
    const { handleLikePost, handleUnlikePost } = useLikePost();
    const { user } = useUser();
    const [like, setLike] = useState<number>(data.likes);
    const [liked, setLiked] = useState<boolean>(false);
    if (!data) {
        return <div>게시물 데이터를 불러올 수 없습니다.</div>;
    }
    let content;
    try {
        content = JSON.parse(data.content);
    } catch (error) {
        console.error("Content parsing error:", error);
        return <div>게시물 내용을 불러올 수 없습니다.</div>;
    }
    const likeHandler = (token: string) => {
        if (user.token === "") {
            alert("로그인이 필요합니다.");
            return;
        }
        if (liked) {
            handleUnlikePost({
                userToken: user.token,
                postToken: token,
            });
            setLike((prev) => prev - 1);
        } else {
            handleLikePost({
                userToken: user.token,
                postToken: token,
            });
            setLike((prev) => prev + 1);
        }
        setLiked(!liked);
    };
    return (
        <div>
            <div className="flex justify-between items-center my-2">
                <div className="text-xl font-bold">{data.title}</div>
                <div className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(data.updatedAt), {
                        addSuffix: true,
                        locale: ko,
                    })}
                    <div className="flex justify-between">
                        <BsPeople className="text-primary hover:text-primaryThin cursor-pointer" />{" "}
                        {data.views}
                    </div>
                    <div className="flex justify-between">
                        <BiLike
                            className="text-primary hover:text-primaryThin cursor-pointer"
                            onClick={() => likeHandler(data.token)}
                        />{" "}
                        {like}
                    </div>
                </div>
            </div>

            <div className=" bg-gray-50 p-5">
                {content.root.children.map((child: any, index: number) => (
                    <div key={index}>
                        {child.children.map(
                            (subChild: any, subIndex: number) => {
                                if (subChild.type === "image") {
                                    return (
                                        <div
                                            key={subIndex}
                                            style={{
                                                textAlign: "center",
                                                margin: "10px 0",
                                            }}
                                        >
                                            <img
                                                src={subChild.src}
                                                alt={subChild.altText}
                                                style={{
                                                    maxWidth: subChild.maxWidth,
                                                }}
                                            />
                                            {subChild.showCaption && (
                                                <p
                                                    style={{
                                                        fontStyle: "italic",
                                                        color: "#666",
                                                    }}
                                                >
                                                    {
                                                        subChild.caption
                                                            .editorState.root
                                                            .children[0]?.text
                                                    }
                                                </p>
                                            )}
                                        </div>
                                    );
                                } else if (subChild.type === "text") {
                                    return (
                                        <p
                                            key={subIndex}
                                            style={{
                                                lineHeight: "1.6",
                                                margin: "10px 0",
                                            }}
                                        >
                                            {subChild.text}
                                        </p>
                                    );
                                }
                                return null;
                            }
                        )}
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid #ccc",
                    paddingTop: "10px",
                }}
            ></div>
        </div>
    );
};

export default PostDetail;
