import { convertBigIntToString } from "@/util/ConvertBigIntToString";
import { ChannelQeury } from "../query/ChannelQuery";
import {
    ChannelCreateRequest,
    ChannelItemCreateRequest,
} from "../request/ChannelRequest";

export class ChannelRepository {
    private query: ChannelQeury;

    constructor() {
        this.query = new ChannelQeury();
    }

    //채널 리스트 조회
    async getChannelList() {
        return convertBigIntToString(await this.query.getChannelList());
    }

    //채널 리스트 저장
    async createItemChannel(request: ChannelItemCreateRequest) {
        return convertBigIntToString(
            await this.query.createItemChannel(request)
        );
    }

    //채널 저장
    async createChannel(request: ChannelCreateRequest) {
        return convertBigIntToString(await this.query.createChannel(request));
    }

    async getChannel(channelToken: string, itemToken: string) {
        const response = await this.query.getChannel(channelToken, itemToken);
        if (response == null) {
            return [];
        }
        return convertBigIntToString(response);
    }
}
