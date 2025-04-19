import { CommentDeleteRequest } from "@/lib/request/CommentRequest";

const BASE_URL = process.env.NEXT_PUBLIC_ORIGIN_URL;

// TODO: class 화 해보는 것도 좋을듯
const restClient = {
    get: async <T>(url: string) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const data = await response.json();
        return data as T;
    },
    post: async <T>(url: string, body?: object) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as T;
    },
    postImage: async <T>(url: string, image: FormData) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            body: image,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as T;
    },
    patch: async <T>(url: string, body: object) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // return response as T;
        return data as T;
    },
    put: async <T>(url: string, body: object) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as T;
    },
    delete: async <T>(url: string, body: object) => {
        const response = await fetch(`${BASE_URL}${url}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // return response as T;
        return data as T;
    },
};

export default restClient;
