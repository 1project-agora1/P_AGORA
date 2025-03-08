import { PostQuery } from "@/lib/query/PostQuery";
import {PostPreviewRequest} from "@/lib/request/PostRequest";

export class PostRepository {
  private query: PostQuery;

  constructor() {
    this.query = new PostQuery();
  }

  // 최신 게시물 미리 보기 리스트 조회
  async findRecentPostPreList(params: PostPreviewRequest) {
    return this.query.findPreviewList(
      params.boardToken,
      params.page,
      params.pageSize,
    );
  }

  async findPostDetail(postToken: string) {
    return this.query.findPostDetail(postToken);
  }
}
