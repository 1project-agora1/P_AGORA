"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
    return (
        <div>
            <header className="text-2xl font-bold  flex items-center mt-5 ">
                <div className="border-b-2 border-b-slate-400 w-full">
                    {category?.submenu_name}
                </div>
            </header>
            <main className="post-content">{children}</main>
        </div>
    );
};

export default Layout;
