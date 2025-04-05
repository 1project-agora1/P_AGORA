export interface CommentCreateRequest {
    user_token: string;
    post_token: string;
    parent_comment_token?: string;
    content: string;
}
