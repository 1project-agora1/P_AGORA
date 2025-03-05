import { PostQuery } from "@/lib/query/PostQuery";
import { PostCreateRequest } from "../request/PostRequest";

export class PostRepository {
    private query: PostQuery;

    constructor() {
        this.query = new PostQuery();
    }

    // 최신 게시물 미리 보기 리스트 조회
    async findRecentPostPreList(boardToken: string) {
        return this.query.findPreviewList(boardToken);
    }

    async findPostDetail(postToken: string) {
        return this.query.findPostDetail(postToken);
    }

    async createPost(data: PostCreateRequest) {
        return this.query.createPost(data);
    }
}
