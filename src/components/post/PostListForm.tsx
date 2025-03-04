'use client'

import {useEffect, useState} from 'react'
import {Post} from "@prisma/client"
import {Skeleton} from "@mui/material"
import ErrorDisplay from "@/components/ErrorDisplay";
import {ApiResponse} from "@/lib/ApiResponse";
import {DocumentIcon, EyeIcon, HeartIcon} from "@heroicons/react/24/outline"

export function PostListForm({boardToken}: { boardToken: string }) {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchPreviewData = async () => {
            try {
                if (!boardToken) {
                    throw new Error('유효하지 않은 게시판 토큰')
                }

                const response = await fetch(`/api/post/list/preview/${boardToken}`, {
                    next: {revalidate: 60} // 60초 캐싱
                })

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`)
                }

                const contentType = response.headers.get('content-type')
                if (!contentType?.includes('application/json')) {
                    throw new Error('유효하지 않은 응답 형식')
                }

                const result: ApiResponse<Post[]> = await response.json()

                if (!result.success || !result.data) {
                    throw new Error(result.error || '데이터 불러오기 실패')
                }

                setPosts(result.data)

                setError(null)
            } catch (err) {
                const errorMessage = err instanceof Error
                    ? err.message
                    : '알 수 없는 오류 발생'
                setError(errorMessage)
                console.error('데이터 패칭 에러:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchPreviewData()
    }, [boardToken])

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-full"/>
                <Skeleton className="h-8 w-3/4"/>
                <Skeleton className="h-8 w-2/3"/>
            </div>
        )
    }

    if (error) {
        return <ErrorDisplay
            title="데이터 로딩 실패"
            message={error}
            retryFn={() => window.location.reload()}
        />
    }

    return (
        <div className="space-y-6 font-custom">
            {posts.length === 0 ? (
                <div className="text-center py-12">
                    <div className="mx-auto mb-4 text-primaryThin">
                        <DocumentIcon className="w-12 h-12 inline-block"/>
                    </div>
                    <p className="text-primaryThin font-medium">등록된 게시글이 없습니다</p>
                </div>
            ) : (
                posts.map((post) => (
                    <article
                        key={post.token}
                        className="p-6 border-2 border-primaryThin rounded-xl
                        hover:shadow-lg transition-all duration-300
                        bg-white/90 backdrop-blur-sm"
                    >
                        <div className="flex justify-between items-center gap-4">
                            <h2 className="text-xl font-bold text-primary truncate">
                                {post.title}
                            </h2>

                            <div className="flex gap-4 shrink-0">
                                <div className="flex items-center gap-1 text-primary">
                                    <EyeIcon className="w-5 h-5"/>
                                    <span className="text-sm font-medium">{post.views}</span>
                                </div>
                                <div className="flex items-center gap-1 text-primary">
                                    <HeartIcon className="w-5 h-5"/>
                                    <span className="text-sm font-medium">{post.likes}</span>
                                </div>
                            </div>

                        </div>
                    </article>
                ))
            )}
        </div>
    )
}