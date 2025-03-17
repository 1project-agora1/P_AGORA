export interface PostCreateRequest {
    channel_item_token: string;
    title: string;
    content: string;
    user_token: string;
}

export interface PostPreviewRequest {
    channel_item_token: string;
    page: number;
    pageSize: number;
}