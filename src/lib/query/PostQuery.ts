import { PrismaClientManager } from "@/lib/client/PrismaClientManager";

export class PostQuery {
  async findPreviewList(boardToken: string, page: number, pageSize: number) {
    const prisma = PrismaClientManager.getClient();
    const paginatedResults = await prisma.post.findMany({
      select: {
        token: true, // 상세 조회 넘어가기 위한 토큰
        title: true, // 미리 보기 리스트에서 보여줄 항목
        views: true, // 미리 보기 리스트에서 보여줄 항목
        likes: true, // 미리 보기 리스트에서 보여줄 항목
        type: true, // 미리 보기 리스트에서 이미지 존재하면 보여주기 위한 검사 항목
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
    console.log(totalCount)
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
        type: true, // 프론트 페이지 구성을 위한 게시물 타입
        createdAt: true, // 작성 시기
        updatedAt: true, // 수정 시기
      },
      where: {
        token: postToken,
      },
    });
  }
}
