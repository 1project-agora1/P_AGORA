import { ApiResponse } from "@/lib/ApiResponse";
import { Channel } from "@/lib/types/ChannerType";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useChannels() {
    const { data, error } = useSWR<ApiResponse<Channel[]>>(
        "/api/channel/list",
        fetcher
    );

    return {
        channels: data?.data || [],
        loading: !error && !data,
        error: error || (data && !data.success ? data.error : null),
    };
}
