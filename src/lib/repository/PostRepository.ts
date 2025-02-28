import {PostQuery} from "@/lib/query/PostQuery";

export class PostRepository {
    private query: PostQuery;

    constructor() {
        this.query = new PostQuery();
    }

    // 최신 게시물 미리 보기 리스트 조회
    async findRecentPostPreList(boardToken: string) {
        return this.query.findPreviewList(boardToken);
    }

}
