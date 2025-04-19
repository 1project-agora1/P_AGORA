export type CommentResponse = {
    token: string;
    parent_comment_token: string;
    content: string;
    updatedAt: Date;
    user: {
        nickname: string;
        token: string;
    };
};
export type CommentListResponse = {
    data: CommentResponse[];
};
