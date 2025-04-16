import React, { useState } from "react";
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
    onCommentDelete,
    currentUserToken,
}) => {
    const [comment, setComment] = useState<string>(
        existingComment?.content || "",
    );
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const isLoggedIn =
        typeof currentUserToken === "string" && currentUserToken.trim() !== "";
    const isAuthor = existingComment?.user_token === currentUserToken; // 본인 확인
    const { handleCommentCreate, handleCommentUpdate, handleCommentDelete } =
        useCommentHook();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            setShowLoginModal(true); // 비로그인 상태에서 로그인 모달 표시
            return;
        }

        if (!comment.trim()) {
            toast.warning("댓글 내용을 입력해주세요.");
            return;
        }

        const successHandler = (data: any) => {
            onCommentSubmit(data);
            setComment("");
        };

        // 댓글 수정 및 작성
        if (existingComment) {
            // 댓글 수정
            await handleCommentUpdate(
                currentUserToken,
                existingComment.comment_token,
                comment,
                successHandler,
            );
        } else {
            // 댓글 작성
            await handleCommentCreate(
                currentUserToken,
                postToken,
                comment,
                successHandler,
            );
        }
    };

    // 댓글 삭제
    const handleDelete = async () => {
        await handleCommentDelete(
            existingComment?.comment_token,
            onCommentDelete,
            currentUserToken,
        );
    };

    return (
        <>
            {/*댓글 작성 폼*/}
            <form onSubmit={handleSubmit} className="mt-4">
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
                        value={comment}
                        onChange={(e) => {
                            if (isLoggedIn) setComment(e.target.value);
                        }}
                        onClick={() => {
                            if (!isLoggedIn) setShowLoginModal(true);
                        }}
                        readOnly={!isLoggedIn}
                    />

                    {/* 비로그인 상태에서만 오버레이 표시 */}
                    {!isLoggedIn && (
                        <div
                            className="absolute inset-0 bg-transparent flex items-center justify-center cursor-pointer"
                            onClick={() => setShowLoginModal(true)}
                        >
                            {/* 투명 오버레이 */}
                        </div>
                    )}
                </div>

                {/*댓글 수정 삭제*/}
                <div className="flex gap-2 mt-2">
                    <button
                        type="submit"
                        className={`px-r py-2 rounded ${
                            isLoggedIn
                                ? "bg-primary text-white"
                                : "bg-gray-400 text-gray-700"
                        }`}
                        disabled={!isLoggedIn}
                    >
                        {existingComment ? "댓글 수정" : "댓글 작성"}
                    </button>
                    {existingComment && isLoggedIn && isAuthor && (
                        <div className="flex gap-2 mt-2">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                수정 완료
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleDelete}
                            >
                                댓글 삭제
                            </button>
                        </div>
                    )}
                </div>
            </form>

            {/* 로그인 요청 모달 */}
            {showLoginModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-bold mb-4">
                            로그인이 필요합니다
                        </h2>
                        <LoginForm
                            onSuccess={() => {
                                setShowLoginModal(false); // 로그인 성공 시 모달 닫기
                                window.location.reload(); // 페이지 새로고침으로 로그인 상태 반영
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
