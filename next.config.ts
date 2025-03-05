import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/uploaded/image/:path*",
                destination: "/uploaded/image/:path*", // 파일 시스템과 동일한 경로
            },
        ];
    },
};

export default nextConfig;
