import { Service } from "typedi";
import { Board } from "../../../../core/domain/entities/board/Board";
import { IBoardRepository } from "../../../../core/gateways/repositories/board/IBoardRepository";
import { BoardDb } from "../../entities/board/BoardDb";
import { BOARD_SCHEMA } from "../../schemas/board/BoardSchema";
// import { DATA_SCHEMA } from "../../schemas/datas/DataSchema";
import { BaseRepository } from "../base/BaseRepository";





@Service("board.repository")
export class BoardRepository extends BaseRepository<string, Board, BoardDb>
 implements IBoardRepository
{
    constructor(){
        super(BoardDb,BOARD_SCHEMA)
    }
   

    async getByWorkspaceId(workSpaceId: string): Promise<Board[] | null> {
        const  query = this.repository
        .createQueryBuilder(BOARD_SCHEMA.TABLE_NAME)
        // .leftJoinAndSelect(
        //     `${BOARD_SCHEMA.TABLE_NAME}.${BOARD_SCHEMA.RELATED_MANY.DATA}`, `${DATA_SCHEMA.TABLE_NAME}`
        // )
        .where(
            `${BOARD_SCHEMA.TABLE_NAME}.${BOARD_SCHEMA.COLUMNS.WORKSPACE_ID} =:workSpaceId`,
            {workSpaceId}
        )

        const result = await query.getMany();
        return result ? result.map((e)=> e.toEntity()) : null;
    }

}