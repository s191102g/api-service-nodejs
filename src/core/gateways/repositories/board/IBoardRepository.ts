import { IBoard } from "../../../domain/interfaces/board/IBoard";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";




export interface IBoardRepository extends IBaseRepository<string, IBoard>{

}