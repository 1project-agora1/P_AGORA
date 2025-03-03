'use client'

import { usePathname } from "next/navigation"
import {PostListForm} from "@/components/post/PostListForm";

export default function PostList() {
    const pathname = usePathname()

    if(!pathname) return <div>Loading...</div>

    const segments = pathname.split("/")
    const boardToken = segments[4]

    return <PostListForm boardToken={boardToken} />
}
