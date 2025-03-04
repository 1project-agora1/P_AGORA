import * as fs from "fs/promises";
import { NextResponse } from "next/server";
import * as path from "path";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await params;
        const filePath = path.join(
            process.cwd(),
            "uploaded",
            "image",
            filename
        );
        // 파일 존재 여부 확인
        await fs.access(filePath);

        // 파일 읽기
        const fileBuffer = await fs.readFile(filePath);

        return new Response(fileBuffer, {
            headers: {
                "Content-Type": "image/png", // 필요하면 확장자에 맞게 변경
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
}
