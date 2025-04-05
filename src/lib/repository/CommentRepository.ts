import { CommentQuery } from "@/lib/query/CommentQuery";
import {
    CommentCreateRequest,
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
}
