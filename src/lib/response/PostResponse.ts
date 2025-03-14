import {Post} from "@prisma/client";

export type PostListResponse = {
    posts: Post[];
    totalCount: number;
    totalPages: number;
};