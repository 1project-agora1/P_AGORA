import { BatchApplication } from "@/batch";
import { PopularPostJob } from "@/batch/jobs/popularPostJob";

// 서버 시작 시 배치 작업 스케줄러 시작
//테스트 시 development로 설정
if (process.env.NODE_ENV === "production") {
    BatchApplication.start();
}

// 수동 실행용 API 엔드포인트
export async function POST(request: Request) {
    try {
        await PopularPostJob.execute();
        return new Response("배치 작업이 성공적으로 실행되었습니다.", {
            status: 200,
        });
    } catch (error) {
        return new Response("배치 작업 실행 중 오류가 발생했습니다.", {
            status: 500,
        });
    }
}
