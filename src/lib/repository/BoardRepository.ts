import {BoardQuery} from "@/lib/query/BoardQuery";

export class BoardRepository{
    private query: BoardQuery;

    constructor() {
        this.query = new BoardQuery();
    }


    async findBoardName(token: string){
        return this.query.findBoardNameByToken(token);
    }

}