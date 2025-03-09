"use client";

import PostDetail from "@/components/post/PostDetail";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function WritePage() {
    const pathname = usePathname();
    const segments = pathname.split("/");
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <PostDetail data={data} />
        </>
    );
}
