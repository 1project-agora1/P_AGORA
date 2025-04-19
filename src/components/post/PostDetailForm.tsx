"use client";
import { useLikePost } from "@/lib/hooks/postLikeHook";
import { useUser } from "@/lib/hooks/useUser";
import { PostDetailType } from "@/lib/types/PostType";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { toast } from "react-toastify";
import CommentForm from "@/components/comment/CommentForm";
import { CommentListResponse } from "@/lib/response/CommentResponse";
import { useCommentHook } from "@/lib/hooks/commentHook";

const PostDetailForm: React.FC<PostDetailType> = ({ data }) => {
    const { handleLikePost, handleUnlikePost, handleViewPost, isLikePost } =
        useLikePost();
    const { handleCommentDelete } = useCommentHook();
    const { user } = useUser();
    const [like, setLike] = useState<number>(data.likes);
    const [views, setViews] = useState<number>(data.views);
    const [liked, setLiked] = useState<boolean>(false);
    const [viewed, setViewed] = useState<boolean>(false); // 추가: 조회 여부 상태
    const [comments, setComments] = useState<CommentListResponse>({
        data: [],
    }); // 댓글 상태
    const [selectedComment, setSelectedComment] = useState<any>(null); // 선택된 댓글 상태

    if (!data) {
        return <div>게시물 데이터를 불러올 수 없습니다.</div>;
    }
    let content;
    try {
        content = JSON.parse(data.content);
    } catch (error) {
        toast.error("게시물 내용을 불러오는 데 실패했습니다.");
        return <div>게시물 내용을 불러올 수 없습니다.</div>;
    }
    const likeHandler = (token: string) => {
        if (user.token === "") {
            toast.warning("로그인이 필요합니다.");
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

    // 댓글 목록 불러오기 함수
    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comment/list/${data.token}`);
            if (response.ok) {
                const fetchedComments = await response.json();
                setComments(fetchedComments);
            } else {
                toast.error("댓글을 불러오는 데 실패했습니다.");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // 댓글 작성/수정 후 실행할 함수
    const fetchCommentSubmit = async () => {
        await fetchComments();
        setSelectedComment(null);
    };

    // 댓글 삭제 함수
    const fetchCommentDelete = async (commentToken: string) => {
        await handleCommentDelete(
            commentToken,
            async () => {
                await fetchComments();
                setSelectedComment(null);
            },
            user.token,
        );
        setComments((prev) => ({
            ...prev,
            data: prev.data.filter((c) => c.token !== commentToken),
        }));
    };

    useEffect(() => {
        if (!viewed) {
            handleViewPost({ postToken: data.token }).then((res: any) => {
                if (res.status === 200) {
                    setViews((prev) => prev + 1);
                }
            });
            setViewed(true); // 조회 상태를 true로 설정
        }
        isLikePost({
            userToken: user.token,
            postToken: data.token,
        })?.then((res: any) => {
            if (res.success) {
                setLiked(res.data.count > 0);
            }
        });
        fetchComments();
    }, [data.token, viewed]);
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
                        {views}
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
                            },
                        )}
                    </div>
                ))}
            </div>

            {/* 댓글 목록 */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">댓글</h3>
                {comments?.data && comments.data.length > 0 ? (
                    comments.data.map((comment) => {
                        const isValidDate = !isNaN(
                            new Date(comment.updatedAt).getTime(),
                        );

                        return (
                            <div key={comment.token} className="border-b py-2">
                                <p>{comment.content}</p>
                                <span className="text-sm text-gray-500">
                                    작성자:{" "}
                                    {comment.user?.nickname || "알 수 없음"} |{" "}
                                    {isValidDate
                                        ? formatDistanceToNow(
                                              new Date(comment.updatedAt),
                                              {
                                                  addSuffix: true,
                                                  locale: ko,
                                              },
                                          )
                                        : "방금 전"}
                                </span>
                                {user.token === comment.user.token && (
                                    <div className="flex gap-2 mt-1 transition-opacity">
                                        <button
                                            onClick={() =>
                                                setSelectedComment({
                                                    comment_token:
                                                        comment.token,
                                                    user_token: user.token,
                                                    content: comment.content,
                                                })
                                            }
                                            className="text-xs text-blue-500 hover:underline"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() =>
                                                fetchCommentDelete(
                                                    comment.token,
                                                )
                                            }
                                            className="text-xs text-red-500 hover:underline"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>아직 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</p>
                )}
            </div>

            {/* 댓글 작성 폼 */}
            <CommentForm
                postToken={data.token}
                existingComment={selectedComment}
                onCommentSubmit={fetchCommentSubmit}
                onCommentDelete={fetchCommentDelete}
                currentUserToken={user.token}
            />
        </div>
    );
};

export default PostDetailForm;
