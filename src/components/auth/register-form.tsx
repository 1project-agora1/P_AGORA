'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterValidator } from '@/lib/validator'
import type { z } from 'zod'

type FormValues = z.infer<typeof RegisterValidator>

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(RegisterValidator)
    })

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || '회원가입 실패')
            }

            alert('회원가입이 완료되었습니다!')
        } catch {
            alert('회원 가입 실패')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label>이름</label>
                <input
                    {...register('nickname')}
                    className="w-full p-2 border rounded"
                />
                {errors.nickname && <p className="text-red-500">{errors.nickname.message}</p>}
            </div>

            <div>
                <label>이메일</label>
                <input
                    type="email"
                    {...register('email')}
                    className="w-full p-2 border rounded"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label>비밀번호</label>
                <input
                    type="password"
                    {...register('password')}
                    className="w-full p-2 border rounded"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div>
                <label>비밀번호 확인</label>
                <input
                    type="password"
                    {...register('confirmPassword')}
                    className="w-full p-2 border rounded"
                />
                {errors.confirmPassword && (
                    <p className="text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                회원가입
            </button>
        </form>
    )
}
