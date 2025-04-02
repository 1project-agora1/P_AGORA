import {ChannelItemQuery} from "@/lib/query/ChannelItemQuery";

export class ChannelItemRepository {
    private query: ChannelItemQuery;

    constructor() {
        this.query = new ChannelItemQuery();
    }

    async findChannelItemInfo(token: string){
        return this.query.findChannelItemInfoByToken(token);
    }

}