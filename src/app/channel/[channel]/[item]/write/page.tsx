"use client";

import ErrorDisplay from "@/components/ErrorDisplay";
import Editor from "@/components/lexical/Editor";
import { pathDivided } from "@/util/PathDivider";
import { Skeleton } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function WritePage() {
    const pathname = usePathname();
    const { item3, item4 } = pathDivided(pathname);
    const channel = item3;
    const item = item4;
    const [category, setCategory] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `/api/channel?channelToken=${channel}&itemToken=${item}`
                );
                const data = await res.json();
                setCategory(data.data);
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "알 수 없는 오류 발생";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [channel, item]);
    if (loading) {
        return (
            <div className=" flex flex-col space-y-4 mt-10  justify-center">
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-[500px] w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <ErrorDisplay
                title="데이터 로딩 실패"
                message={error}
                retryFn={() => window.location.reload()}
            />
        );
    }

    return (
        <>
            <div className="mt-10 text-lg font-bold">
                {category?.submenu_name}
            </div>
            <Editor item={item} channel={channel} />
        </>
    );
}
