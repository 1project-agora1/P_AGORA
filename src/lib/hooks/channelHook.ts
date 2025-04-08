import { useState } from "react";
import { getChannelItemTokenList } from "../funcions/channelsFn";
import { ChannelItemData } from "../types/ChannelType";

export const useChannelItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const channelItemTokenList = async (): Promise<{
        data: ChannelItemData[];
    }> => {
        setLoading(true);
        setError(null);
        try {
            return await getChannelItemTokenList();
        } catch (err) {
            if (err instanceof TypeError && err.message.includes("fetch")) {
                setError(new Error("Network error: Failed to fetch"));
            } else {
                setError(err as Error);
            }
            return { data: [] };
        } finally {
            setLoading(false);
        }
    };

    return {
        channelItemTokenList,
        loading,
        error,
    };
};
