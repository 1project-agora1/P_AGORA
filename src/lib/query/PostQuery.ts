import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { generateRandomToken } from "@/util/RandomToken";
import { PostCreateRequest } from "../request/PostRequest";

export class PostQuery {
  async findPreviewList(boardToken: string, page: number, pageSize: number) {
    const prisma = PrismaClientManager.getClient();
    const paginatedResults = await prisma.post.findMany({
      select: {
        token: true, // 상세 조회 넘어가기 위한 토큰
        title: true, // 미리 보기 리스트에서 보여줄 항목
        views: true, // 미리 보기 리스트에서 보여줄 항목
        likes: true, // 미리 보기 리스트에서 보여줄 항목
      },
      where: {
        board_token: boardToken,
      },
      orderBy: {
        createdAt: "desc", // 최신순 정렬
      },
      skip: (page - 1) * pageSize, // 이전 페이지 데이터 스킵
      take: pageSize, // 현재 페이지 데이터 가져오기
    });

    // 총 데이터 개수 계산
    const totalCount = await prisma.post.count({
      where: {
        board_token: boardToken,
      },
    });

    return {
      data: paginatedResults,
      totalCount, // 총 데이터 개수 반환
      totalPages: Math.ceil(totalCount / pageSize), // 총 페이지 수 계산
    };
  }

    findPostDetail(postToken: string) {
        const prisma = PrismaClientManager.getClient();
        return prisma.post.findFirst({
            select: {
                title: true, // 제목
                content: true, // 내용
                user_token: true, // 작성자 정보
                views: true, // 조회 수
                likes: true, // 좋아요 수
                createdAt: true, // 작성 시기
                updatedAt: true, // 수정 시기
            },
            where: {
                token: postToken,
            },
        });
    }

    createPost(data: PostCreateRequest) {
        const prisma = PrismaClientManager.getClient();
        const token = generateRandomToken();
        const postData = {
            token: token,
            title: data.title,
            content: data.content,
            user_token: data.user_token,
            board_token: data.board_token,
            views: 0,
            likes: 0,
            updatedAt: new Date(),
            createdAt: new Date(),
        };
        console.log(postData);
        return prisma.post.create({
            data: postData,
        });
    }
}
