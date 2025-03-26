import { PostQuery } from "@/lib/query/PostQuery";
import { PostLikeRequest, PostPreviewRequest } from "@/lib/request/PostRequest";
import { convertBigIntToString } from "@/util/ConvertBigIntToString";
import { PostCreateRequest } from "../request/PostRequest";

export class PostRepository {
    private query: PostQuery;

    constructor() {
        this.query = new PostQuery();
    }

    // 최신 게시물 미리 보기 리스트 조회
    async findRecentPostPreList(params: PostPreviewRequest) {
        return this.query.findPreviewList(
            params.channel_item_token,
            params.page,
            params.pageSize
        );
    }

    async findPostDetail(postToken: string) {
        return this.query.findPostDetail(postToken);
    }

    async createPost(data: PostCreateRequest) {
        const response = await this.query.createPost(data);
        if (response == null) {
            return null;
        }
        return convertBigIntToString(response);
    }

    async updatePost(data: PostCreateRequest) {
        const response = await this.query.updatePost(data);
        if (response == null) {
            return null;
        }
        return convertBigIntToString(response);
    }

    async deletePost(postToken: string) {
        const response = await this.query.deletePost(postToken);
        if (response == null) {
            return null;
        }
        return convertBigIntToString(response);
    }
    async likePost(data: PostLikeRequest) {
        const response = await this.query.likePost(data);
        if (response == null) {
            console.log("likePost response is null");
            return {};
        }
        return convertBigIntToString(response);
    }
    async unLikePost(data: PostLikeRequest) {
        const response = await this.query.unLikePost(data);
        if (response == null) {
            console.log("likePost response is null");
            return {};
        }
        return convertBigIntToString(response);
    }
}
