export interface PostDetailType {
    data: {
        token: string;
        title: string;
        content: string;
        user_token: string;
        views: number;
        likes: number;
        createdAt: string;
        updatedAt: string;
    };
}

export interface PostDetailAllotType {
    token: string;
    title: string;
    content: string;
    user_token: string;
    views: number;
    likes: number;
    createdAt: string;
    updatedAt: string;
}
