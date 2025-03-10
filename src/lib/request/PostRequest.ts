import { PostType } from "@prisma/client";

export interface PostCreateRequest {
    board_token: string;
    title: string;
    content: string;
    user_token: string;
    type: PostType;
}

export interface PostPreviewRequest {
    boardToken: string;
    page: number;
    pageSize: number;
}