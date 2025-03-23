"use client";
import Editor from "@/components/lexical/Editor";
import { Skeleton } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPost() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const channel = segments[2];
    const item = segments[3];
    const post = segments[4];

    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/post/detail?postToken=${post}`);
                const data = await res.json();
                setData(data.data);
            } catch (error) {
                console.error("Failed to fetch post data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [post]);
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
    return (
        <div>
            <Editor item={item} channel={channel} data={data} />
        </div>
    );
}
