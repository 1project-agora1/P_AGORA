import { toast } from "react-toastify";
import {
    CommentCreateRequest,
    CommentDeleteRequest,
    CommentUpdateRequest,
} from "@/lib/request/CommentRequest";
import {
    createComment,
    deleteComment,
    updateComment,
} from "@/lib/funcions/commentsFn";

export const useCommentHook = () => {
    const handleCommentCreate = async (
        userToken: string,
        postToken: string,
        content: string,
        onSuccess: (data: any) => void,
    ) => {
        try {
            // 댓글 생성 요청
            const request: CommentCreateRequest = {
                user_token: userToken,
                post_token: postToken,
                content,
            };
            const response = await createComment(request);

            if (response instanceof Response && response.ok) {
                const data = await response.json();
                onSuccess(data);
                toast.success("댓글이 성공적으로 추가되었습니다.");
            } else {
                toast.error("댓글 추가에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error creating comment:", error);
            toast.error("댓글 추가 중 오류가 발생했습니다.");
        }
    };

    const handleCommentUpdate = async (
        userToken: string,
        commentToken: string,
        content: string,
        onSuccess: (data: any) => void,
    ) => {
        const toastId = toast.loading("댓글 수정 중...", {
            autoClose: false,
            closeOnClick: false,
        });

        try {
            // 댓글 수정 요청
            const request: CommentUpdateRequest = {
                user_token: userToken,
                comment_token: commentToken,
                content: content,
            };
            const response = await updateComment(request);

            const data = response.data;

            onSuccess(data);
            toast.update(toastId, {
                render: "댓글이 성공적으로 수정되었습니다.",
                type: "success",
                autoClose: 2000,
                isLoading: false,
            });
        } catch (error) {
            console.error("Error updating comment:", error);
            toast.update(toastId, {
                render: "댓글 수정 중 오류가 발생했습니다.",
                type: "error",
                autoClose: 3000,
                isLoading: false,
            });
        }
    };

    const handleCommentDelete = async (
        existingComment: string | undefined,
        onCommentDelete: ((commentId: string) => void) | undefined,
        currentUserToken: string | undefined,
    ) => {
        if (!existingComment || !onCommentDelete || !currentUserToken) return;

        const toastId = toast.loading("댓글 삭제 중...", {
            autoClose: false,
            closeOnClick: false,
        });

        try {
            const request: CommentDeleteRequest = {
                user_token: currentUserToken,
                comment_token: existingComment,
            };

            await deleteComment(request);
            onCommentDelete(existingComment);
            toast.update(toastId, {
                render: "댓글이 삭제되었습니다",
                type: "success",
                autoClose: 2000,
                isLoading: false,
            });
        } catch (error) {
            console.error("삭제 실패:", error);
            toast.update(toastId, {
                render: "삭제에 실패했습니다",
                type: "error",
                autoClose: 3000,
                isLoading: false,
            });
        }
    };

    return {
        handleCommentCreate,
        handleCommentUpdate,
        handleCommentDelete,
    };
};
