"use client";

import Editor from "@/components/lexical/Editor";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function WritePage() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const channel = segments[2];
    const item = segments[3];
    const [category, setCategory] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `/api/channel?channelToken=${channel}&itemToken=${item}`
            );
            const data = await res.json();
            setCategory(data.data);
        };
        fetchData();
    }, [channel, item]);
    console.log(category);
    return (
        <>
            <div className="mt-10 text-lg font-bold">
                {category?.submenu_name}
            </div>
            <Editor item={item} channel={channel} />
        </>
    );
}
