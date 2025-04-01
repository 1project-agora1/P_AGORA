import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { generateRandomToken } from "@/util/RandomToken";
import { PostCreateRequest, PostLikeRequest } from "../request/PostRequest";

export class PostQuery {
  async findPreviewList(
    channelItemToken: string,
    page: number,
    pageSize: number,
  ) {
    const prisma = PrismaClientManager.getClient();
    const paginatedResults = await prisma.post.findMany({
      select: {
        token: true, // 상세 조회 넘어가기 위한 토큰
        user_token: true, // 게시물 작성자를 확인하기 위한 토큰
        title: true, // 미리 보기 리스트에서 보여줄 항목
        views: true, // 미리 보기 리스트에서 보여줄 항목
        likes: true, // 미리 보기 리스트에서 보여줄 항목
        createdAt: true, // 게시물 생성 시간
        user: {
          select: {
            nickname: true, // 작성자 닉네임 가져오기
          },
        },
      },
      where: {
        channel_item_token: channelItemToken,
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
        channel_item_token: channelItemToken,
      },
    });
    // 반환 데이터 타입을 명확히 정의하여 클라이언트와 일치하도록 수정
    const formattedResults = paginatedResults.map((post) => ({
      token: post.token,
      title: post.title,
      views: post.views,
      likes: post.likes,
      createdAt: post.createdAt,
      nickname: post.user?.nickname || "Unknown", // 작성자 닉네임 병합
    }));

    return {
      data: formattedResults,
      totalCount, // 총 데이터 개수 반환
      totalPages: Math.ceil(totalCount / pageSize), // 총 페이지 수 계산
    };
  }

  findPostDetail(postToken: string) {
    const prisma = PrismaClientManager.getClient();
    return prisma.post.findFirst({
      select: {
        token: true, // 게시물 토큰
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
      channel_item_token: data.channel_item_token,
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

  updatePost(data: PostCreateRequest) {
    const prisma = PrismaClientManager.getClient();
    return prisma.post.update({
      where: {
        token: data.token,
      },
      data: {
        title: data.title,
        content: data.content,
        updatedAt: new Date(),
      },
    });
  }

  deletePost(postToken: string) {
    const prisma = PrismaClientManager.getClient();
    return prisma.post.delete({
      where: {
        token: postToken,
      },
    });
  }

  async likePost(data: PostLikeRequest) {
    const prisma = PrismaClientManager.getClient();
    return await prisma.post.update({
      where: {
        token: data.postToken,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  }

  async unLikePost(data: PostLikeRequest) {
    const prisma = PrismaClientManager.getClient();
    return await prisma.post.update({
      where: {
        token: data.postToken,
      },
      data: {
        likes: {
          decrement: 1,
        },
      },
    });
  }
}
