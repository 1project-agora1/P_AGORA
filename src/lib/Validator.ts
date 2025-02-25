import {z} from 'zod';

// TODO: 조건 검토 필요
export const RegisterValidator = z.object({
    nickname: z.string().min(2, '닉네임은 2자 이상 입력해주세요'),
    email: z.string().email('유효한 이메일을 입력해주세요'),
    password: z.string().min(6, '비밀번호는 6자 이상 입력해주세요'),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword']
});

export const LoginValidator = z.object({
    email: z.string().email('유효한 이메일을 입력해주세요'),
    password: z.string().min(6, '비밀번호는 6자 이상 입력해주세요')
});
