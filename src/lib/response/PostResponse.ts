export type PostListResponse = {
    posts: PostPreviewResponse[];
    totalCount: number;
    totalPages: number;
};

export type PostPreviewResponse = {
    token: string;
    title: string;
    views: number;
    likes: number;
    createdAt: Date;
    nickname: string;
};

export type IsLikedCountResponse = {
    count: number;
};
