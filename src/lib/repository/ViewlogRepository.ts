import { ViewLogQuery } from "../query/ViewLogQuery";
import { ViewLogRequest } from "../request/ViewLogRequest";

export class ViewLogRepository {
    private query: ViewLogQuery;

    constructor() {
        this.query = new ViewLogQuery();
    }

    async createViewLog(params: ViewLogRequest) {
        return this.query.createViewLog(params);
    }

    async countViewLog(params: ViewLogRequest) {
        return this.query.countViewLog(params);
    }
}
