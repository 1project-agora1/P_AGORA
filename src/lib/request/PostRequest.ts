export interface PostCreateRequest {
    channel_item_token: string;
    title: string;
    content: string;
    user_token: string;
    token?: string;
}

export interface PostPreviewRequest {
    channel_item_token: string;
    page: number;
    pageSize: number;
}

export interface PostLikeRequest {
    userToken: string;
    postToken: string;
}
