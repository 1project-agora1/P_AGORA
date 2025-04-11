export interface PopularPost {
    token: string;
    title: string;
    view_count: number;
    like_count: number;
    comment_count: number;
    score: number;
    postCreatedAt: string;
    parent_menu_token: string;
    submenu_token: string;
    user_nickname: string;
}

export interface PopularPostResponse {
    status: number;
    message: string;
    data: { data: PopularPost[]; totalCount: number; totalPages: number };
}

export interface TotalPopularPostCountResponse {
    status: number;
    message: string;
    data: { totalCount: number };
}
