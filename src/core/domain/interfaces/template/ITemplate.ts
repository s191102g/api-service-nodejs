import { IEntity } from "../base/IEntity";
import { IBoard } from "../board/IBoard";


export interface ITemplate extends IEntity<string>{
    typeByString:string;
    usageFields: any[];

    // relationship
    board: IBoard;
}