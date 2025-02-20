import RegisterForm from '@/components/auth/register-form'

export const metadata = {
    title: '회원가입',
}

export default function RegisterPage() {
    return (
        <div className="mx-auto max-w-md p-4">
            <h1 className="text-2xl font-bold mb-6">새 계정 만들기</h1>
            <RegisterForm />
        </div>
    )
}