import { useState } from "react";
import { getPopularPosts, getPopularPostsList } from "../funcions/postsFn";
import { PostPopularRequest } from "../request/PostRequest";
import { PopularPostResponse } from "../types/PopularPostType";

export const usePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getPopularPostsHook = async (): Promise<
        PopularPostResponse | undefined
    > => {
        setLoading(true);
        setError(null);
        try {
            return await getPopularPosts();
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const getPopularPostsListHook = async (
        popularPost: PostPopularRequest,
    ): Promise<PopularPostResponse | undefined> => {
        setLoading(true);
        setError(null);
        try {
            return await getPopularPostsList(popularPost);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    return {
        getPopularPostsHook,
        getPopularPostsListHook,
        loading,
        error,
    };
};
