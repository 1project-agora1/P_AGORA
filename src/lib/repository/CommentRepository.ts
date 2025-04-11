import { CommentQuery } from "@/lib/query/CommentQuery";
import {
    CommentCreateRequest,
    CommentDeleteRequest,
    CommentUpdateRequest,
} from "@/lib/request/CommentRequest";
import { convertBigIntToString } from "@/util/ConvertBigIntToString";

export class CommentRepository {
    private query: CommentQuery;

    constructor() {
        this.query = new CommentQuery();
    }

    async createComment(data: CommentCreateRequest) {
        const response = await this.query.createComment(data);
        if (response == null) {
            return null;
        }
        return convertBigIntToString(response);
    }

    async updateComment(data: CommentUpdateRequest) {
        const response = await this.query.updateComment(data);
        if (response == null) {
            return null;
        }
        return convertBigIntToString(response);
    }

    async deleteComment(data: CommentDeleteRequest) {
        const response = await this.query.deleteComment(data);
        if (response == null) {
            return null;
        }
        return convertBigIntToString(response);
    }

    async findCommentsFromPost(token: string) {
        const response = await this.query.getComments(token);
        if (response == null) {
            return null;
        }
        return convertBigIntToString(response);
    }
}
