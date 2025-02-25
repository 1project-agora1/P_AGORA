module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'check-file'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'next/core-web-vitals', // Next.js 기본 설정
    ],
    rules: {
        // 파일명 컨벤션 규칙
        'check-file/folder-match-with-fex': [
            'error',
            {
                '*.tsx': ['components', 'pages'],
                '*.ts': ['lib', 'api'],
            },
        ],
        'check-file/folder-match-with-regex': [
            'error',
            {
                '**/*.test.ts': '^__tests__$', // 테스트 파일은 __tests__ 폴더에 있어야 함
            },
        ],
        // 추가 규칙 필요시 여기에 작성
    },
};