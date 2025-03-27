import { useState } from "react";
import { likePost, unLikePost } from "../funcions/postsFn";

export const useLikePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleLikePost = async (postLikeToken: {
        userToken: string;
        postToken: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            await likePost(postLikeToken);
        } catch (err) {
            if (err instanceof TypeError && err.message.includes("fetch")) {
                setError(new Error("Network error: Failed to fetch"));
            } else {
                setError(err as Error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUnlikePost = async (postLikeToken: {
        userToken: string;
        postToken: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            await unLikePost(postLikeToken);
        } catch (err) {
            if (err instanceof TypeError && err.message.includes("fetch")) {
                setError(new Error("Network error: Failed to fetch"));
            } else {
                setError(err as Error);
            }
        } finally {
            setLoading(false);
        }
    };

    return { handleLikePost, handleUnlikePost, loading, error };
};
