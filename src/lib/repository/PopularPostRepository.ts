import { convertBigIntToString } from "@/util/ConvertBigIntToString";
import { PopularPostQuery } from "../query/PopularPostQuery";

export class PopularPostRepository {
    private query: PopularPostQuery;

    constructor() {
        this.query = new PopularPostQuery();
    }

    async getPopularPosts() {
        const posts = await this.query.getPopularPosts();
        return convertBigIntToString(posts);
    }
}
