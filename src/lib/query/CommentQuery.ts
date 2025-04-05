import {
    CommentCreateRequest,
    CommentUpdateRequest,
} from "@/lib/request/CommentRequest";
import { PrismaClientManager } from "@/lib/client/PrismaClientManager";
import { generateRandomToken } from "@/util/RandomToken";

export class CommentQuery {
    // 댓글 작성
    async createComment(data: CommentCreateRequest) {
        const prisma = PrismaClientManager.getClient();
        const token = generateRandomToken();

        const commentData = {
            token: token,
            user_token: data.user_token,
            post_token: data.post_token,
            parent_comment_token: data.parent_comment_token || undefined,
            content: data.content,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return prisma.comment.create({
            data: commentData,
        });
    }

    // 댓글 수정
    async updateComment(data: CommentUpdateRequest) {
        const prisma = PrismaClientManager.getClient();
        return prisma.comment.update({
            where: {
                token: data.token,
            },
            data: {
                content: data.content,
            },
        });
    }
}
