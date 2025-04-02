import { PostLikeRequest, PostViewRequest } from "../request/PostRequest";
import restClient from "../restClient";

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
