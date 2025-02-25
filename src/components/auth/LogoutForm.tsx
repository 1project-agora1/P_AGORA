'use client'

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function LogoutForm() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()          // 새로 고침 차단, SPA 특성 유지, 상태 유지
        setIsSubmitting(true)       // 상태 관리 시작, 중복 요청 방지

        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || '로그아웃 처리 실패')
            }

            // 캐시 무효화 및 강제 리다이렉트
            // 메인 페이지로 리다이렉트
            window.location.assign(`/?cacheBust=${Date.now()}`)
        } catch (error) {
            console.error('로그아웃 에러 : ', error)
            alert(error instanceof Error ? error.message : '알 수 없는 오류 발생')
            router.push('/')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            {isSubmitting ? (
                <>
                    <LoadingSpinner/>
                    <p className="text-gray-600 animate-pulse">
                        로그아웃 처리 중입니다...
                    </p>
                </>
            ) : (
                <>
                    <p className="text-gray-600 mb-4">정말 로그아웃 하시겠습니까?</p>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 transition-all"
                    >
                        로그아웃
                    </button>
                </>
            )}
        </form>
    )
}
