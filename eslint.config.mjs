import { FlatCompat } from "@eslint/eslintrc";
import checkFilePlugin from "eslint-plugin-check-file";
import unicornPlugin from "eslint-plugin-unicorn";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// ESLint 설정 배열을 변수에 저장
const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            "check-file": checkFilePlugin,
            unicorn: unicornPlugin,
        },
        rules: {
            // 파일명 컨벤션 강제 (PascalCase)
            "unicorn/filename-case": [
                "error",
                {
                    case: "pascalCase", // PascalCase 강제
                    ignore: [
                        "^globals\\.css$", // 전역 CSS 파일 예외 처리
                        "^favicon\\.ico$", // 파비콘 예외 처리
                        "^layout\\.tsx$", // Next.js 레이아웃 파일 예외 처리
                        "^page\\.tsx$", // Next.js 페이지 파일 예외 처리
                        "^route\\.ts$", // route.ts 파일 예외 처리 추가
                        "^*.config\\.ts$", // config 설정 파일 예외 처리
                    ],
                },
            ],
            // Check File: 특정 확장자와 폴더 매칭 강제
            "check-file/folder-match-with-fex": [
                "error",
                {
                    "*.tsx": "**/(components|app)/**", // .tsx는 components와 app 폴더 및 하위 경로 허용
                    "*.ts": "**/(lib|util)/**", // .ts는 lib와 util 폴더 및 하위 경로 허용
                },
            ],

            // Check File : 추가할 네이밍 컨벤션 입력
            // ...
        },
    },
    {
        ignores: [
            // 무시 항목
            "node_modules/", // 기본적으로 무시되는 폴더
            ".next/", // Next.js 빌드 결과물
            "dist/", // 빌드 결과물
            "public/", // 정적 파일 폴더
            "prisma/", // Prisma 관련 스키마 폴더
            "data/", // 데이터 관련 폴더 (예: JSON 또는 CSV)
        ],
    },
    // route.ts 파일에 대한 check-file 규칙 예외 추가 (즉, 해당 룰을 비활성화)
    {
        files: ["**/route.ts"],
        rules: {
            "check-file/folder-match-with-fex": "off",
        },
    },
    {
        files: ["*.config.ts"],
        rules: {
            "check-file/folder-match-with-fex": "off",
        },
    },
];
export default eslintConfig;
