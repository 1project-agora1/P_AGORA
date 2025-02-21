"use client"

import { LoginValidator } from "@/lib/validator"
import { z } from "zod"

export default function LoginForm() {
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(validatedData)
            })

            if(res.ok) {
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
            <button type="submit">Login</button>
        </form>
    )
}
