import {
    PostLikeRequest,
    PostPopularRequest,
    PostViewRequest,
} from "../request/PostRequest";
import restClient from "../restClient";
import { PopularPostResponse } from "../types/PopularPostType";

export const likePost = async (postLikeToken: PostLikeRequest) => {
    return restClient.post(`/api/post/like`, postLikeToken);
};

export const unLikePost = async (postLikeToken: PostLikeRequest) => {
    return restClient.post(`/api/post/unlike`, postLikeToken);
};

export const viewPost = async (postToken: PostViewRequest) => {
    return restClient.post(`/api/post/detail/view`, postToken);
};

export const isLikedPost = async (postLikeToken: PostLikeRequest) => {
    return restClient.get(
        `/api/post/like/check?userToken=${postLikeToken.userToken}&postToken=${postLikeToken.postToken}`,
    );
};

export const getPopularPosts = async (): Promise<PopularPostResponse> => {
    return restClient.get(`/api/post/popular`);
};

export const getPopularPostsList = async (
    popularPost: PostPopularRequest,
): Promise<PopularPostResponse> => {
    return restClient.get(
        `/api/post/popular?page=${popularPost.page}&pageSize=${popularPost.pageSize}`,
    );
};
