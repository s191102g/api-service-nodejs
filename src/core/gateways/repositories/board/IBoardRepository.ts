import { Board } from "../../../domain/entities/board/Board";

import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";




export interface IBoardRepository extends IBaseRepository<string, Board>{
      getByWorkspaceId(workSpaceId:string): Promise<Board[] | null>;
}