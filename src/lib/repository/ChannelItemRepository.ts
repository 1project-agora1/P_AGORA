import {ChannelItemQuery} from "@/lib/query/ChannelItemQuery";

export class ChannelItemRepository {
    private query: ChannelItemQuery;

    constructor() {
        this.query = new ChannelItemQuery();
    }

    async findChannelItemName(token: string){
        return this.query.findChannelItemNameByToken(token);
    }

}