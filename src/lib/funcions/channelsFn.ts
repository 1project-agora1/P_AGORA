import { PostLikeRequest, PostViewRequest } from "../request/PostRequest";
import restClient from "../restClient";
import { ChannelItemData } from "../types/ChannelType";

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

export const getChannelItemTokenList = async (): Promise<{
    data: ChannelItemData[];
}> => {
    return restClient.get(`/api/channel/item/list`);
};
