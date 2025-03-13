import {ApiResponse} from "@/lib/ApiResponse";
import {PrismaClientManager} from "@/lib/client/PrismaClientManager";
import {BoardRepository} from "@/lib/repository/BoardRepository";

export async function GET(
    req: Request,
    {params}: { params: { token: string } }
) {
    const {token: boardToken} = params;
    try {
        const boardRepository = new BoardRepository();
        const board = await boardRepository.findBoardName(boardToken);
        if (!board) {
            return Response.json(
                {
                    success: false,
                    error: "게시판 조회 실패",
                } as ApiResponse,
                {status: 404}
            )
        }

        return Response.json(
            {
                success: true,
                data: {name: board.board_name},
            } as ApiResponse<{ name: string }>,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(`게시판 이름 조회 에러 - boardToken : ${boardToken}`, error);
        return Response.json(
            {
                success: false,
                error: "서버 에러",
            } as ApiResponse,
            {status: 500}
        );
    } finally {
        await PrismaClientManager.shutdown();
    }
}
