"use client"

import {LoginValidator} from "@/lib/validator"
import {z} from "zod"
import React from "react";
import Link from 'next/link';

export default function LoginForm({
                                      onSuccess, onClose
                                  }: {
    onSuccess?: () => void;
    onClose?: () => void
}) {
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)

        try {
            // Zod 유효성 검사
            const validatedData = LoginValidator.parse({
                email: formData.get('email'),
                password: formData.get('password')
            })

            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(validatedData)
            })

            if (res.ok) {
                onSuccess?.(); // 모달 닫기 호출
                window.location.href = '/dashboard'
            } else {
                const errorData = await res.json()
                alert(errorData.message || '로그인에 실패했습니다')
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Zod 에러 메시지 처리
                const errorMessage = error.errors[0]?.message
                alert(errorMessage || '입력값을 확인해주세요')
                return
            }
            alert('예상치 못한 오류가 발생했습니다')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6}
            />
            <button type="submit">로그인</button>

            <div className="mt-4 text-center">
                <span className="text-gray-500">계정이 없으신가요? </span>
                <Link
                    href="/register"
                    prefetch={false}
                    onClick={onClose}
                    className="text-blue-600 hover:underline"
                >
                    회원가입
                </Link>
            </div>
        </form>

    )
}
