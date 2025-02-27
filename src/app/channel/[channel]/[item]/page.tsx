"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Channel() {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const channel = segments[2];
    const item = segments[3];
    console.log(segments);
    return (
        <div>
            <Link href={`/channel/${channel}/${item}/write`}>글쓰기</Link>
        </div>
    );
}
