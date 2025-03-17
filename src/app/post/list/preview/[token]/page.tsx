'use client'

import {useEffect, useState} from "react"
import {usePathname} from "next/navigation"
import {PostListForm} from "@/components/post/PostListForm"
import {pathDivided} from "@/util/PathDivider"

interface ChannelItemData {
    token: string
}

export default function PostList() {
    const pathname = usePathname()
    const [channelItemData, setChannelItemData] = useState<ChannelItemData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!pathname) return

        const {item5} = pathDivided(pathname)
        setChannelItemData([{
            token: item5
        }])
        setLoading(false)
    }, [pathname])

    if (!pathname || loading) {
        return <div className="p-4">로딩 중...</div>
    }

    return <PostListForm channelItems={channelItemData}/>
}
