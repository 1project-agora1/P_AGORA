export interface CommentCreateRequest {
    user_token: string;
    post_token: string;
    parent_comment_token?: string;
    content: string;
}

export interface CommentUpdateRequest {
    user_token: string;
    comment_token: string;
    content: string;
}

export interface CommentDeleteRequest {
    user_token: string;
    comment_token: string;
}
