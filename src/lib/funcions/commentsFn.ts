import restClient from "@/lib/restClient";
import {
    CommentCreateRequest,
    CommentDeleteRequest,
    CommentUpdateRequest,
} from "@/lib/request/CommentRequest";
import { ApiResponse } from "@/lib/ApiResponse";

export const createComment = async (request: CommentCreateRequest) => {
    return restClient.post(`/api/comment/create`, request);
};

export const updateComment = async (
    request: CommentUpdateRequest,
): Promise<ApiResponse> => {
    return restClient.put(`/api/comment/update`, request);
};

export const deleteComment = async (request: CommentDeleteRequest) => {
    return restClient.delete(`/api/comment/delete`, request);
};
