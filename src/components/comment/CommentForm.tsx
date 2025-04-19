"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoginForm from "@/components/auth/LoginForm";
import { useCommentHook } from "@/lib/hooks/commentHook";

interface CommentFormProps {
    postToken: string; // 게시물 토큰
    existingComment?: {
        comment_token: string;
        parent_comment_token?: string;
        user_token: string;
        content: string;
    }; // 수정할 댓글 정보
    onCommentSubmit: (newComment: any) => void; // 댓글 작성 또는 수정 후 부모 컴포넌트에 전달
    onCommentDelete?: (commentId: string) => void; // 댓글 삭제 후 부모 컴포넌트에 전달
    currentUserToken?: string; // 현재 로그인한 사용자 토큰
}

const CommentForm: React.FC<CommentFormProps> = ({
    postToken,
    existingComment,
    onCommentSubmit,
    currentUserToken,
}) => {
    const [writeComment, setWriteComment] = useState<string>("");
    const [editComment, setEditComment] = useState<string>(
        existingComment?.content || "",
    );
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const isLoggedIn =
        typeof currentUserToken === "string" && currentUserToken.trim() !== "";
    const isAuthor = existingComment?.user_token === currentUserToken;
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const { handleCommentCreate, handleCommentUpdate } = useCommentHook();

    useEffect(() => {
        setEditComment(existingComment?.content || "");
        setIsEditing(false);
    }, [existingComment]);

    // 댓글 작성
    const handleWriteSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        if (!writeComment.trim()) {
            toast.warning("댓글 내용을 입력해주세요.");
            return;
        }

        const successHandler = (data: any) => {
            onCommentSubmit(data);
            setWriteComment("");
        };

        await handleCommentCreate(
            currentUserToken!,
            postToken,
            writeComment,
            successHandler,
        );
    };

    // 댓글 수정
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editComment.trim()) {
            toast.warning("댓글 내용을 입력해주세요.");
            return;
        }

        const successHandler = (data: any) => {
            onCommentSubmit(data);
            setIsEditing(false);
        };

        await handleCommentUpdate(
            currentUserToken!,
            existingComment!.comment_token,
            editComment,
            successHandler,
        );
    };

    const handleEditClick = () => setIsEditing(true);
    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditComment(existingComment?.content || "");
    };

    return (
        <>
            {/* 댓글 작성 폼 */}
            {!existingComment && (
                <form onSubmit={handleWriteSubmit} className="mt-4">
                    <div className="relative">
                        <textarea
                            className={`w-full border rounded p-2 ${
                                !isLoggedIn
                                    ? "cursor-pointer bg-gray-100 text-gray-500"
                                    : ""
                            }`}
                            placeholder={
                                isLoggedIn
                                    ? "댓글을 입력하세요..."
                                    : "로그인이 필요합니다."
                            }
                            value={writeComment}
                            onChange={(e) => {
                                if (isLoggedIn) setWriteComment(e.target.value);
                            }}
                            onClick={() => {
                                if (!isLoggedIn) setShowLoginModal(true);
                            }}
                            readOnly={!isLoggedIn}
                        />
                        {!isLoggedIn && (
                            <div
                                className="absolute inset-0 bg-transparent flex items-center justify-center cursor-pointer"
                                onClick={() => setShowLoginModal(true)}
                            />
                        )}
                    </div>
                    <button
                        type="submit"
                        className={`mt-2 px-4 py-2 rounded ${
                            isLoggedIn
                                ? "bg-primary text-white"
                                : "bg-gray-400 text-gray-700"
                        }`}
                        disabled={!isLoggedIn}
                    >
                        댓글 작성
                    </button>
                </form>
            )}

            {/* 댓글 수정 폼 */}
            {existingComment && isAuthor && (
                <>
                    {!isEditing ? (
                        <div className="flex gap-2 mt-2">
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleEditClick}
                            >
                                수정
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleEditSubmit} className="mt-2">
                            <textarea
                                className="w-full border rounded p-2 bg-yellow-50"
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                            />
                            <div className="flex gap-2 mt-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    수정 완료
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-4 py-2 rounded"
                                    onClick={handleCancelEdit}
                                >
                                    취소
                                </button>
                            </div>
                        </form>
                    )}
                </>
            )}

            {showLoginModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            로그인이 필요합니다
                        </h2>
                        <LoginForm
                            onSuccess={() => {
                                setShowLoginModal(false);
                                window.location.reload();
                            }}
                            onClose={() => setShowLoginModal(false)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CommentForm;
