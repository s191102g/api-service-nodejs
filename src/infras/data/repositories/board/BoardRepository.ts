import { Service } from "typedi";
import { Board } from "../../../../core/domain/entities/board/Board";
import { IBoardRepository } from "../../../../core/gateways/repositories/board/IBoardRepository";
import { BoardDb } from "../../entities/board/BoardDb";
import { BOARD_SCHEMA } from "../../schemas/board/BoardSchema";
import { BaseRepository } from "../base/BaseRepository";





@Service("board.repository")
export class BoardRepository extends BaseRepository<string, Board, BoardDb>
 implements IBoardRepository
{
    constructor(){
        super(BoardDb,BOARD_SCHEMA)
    }
}