import { IEntity } from "../base/IEntity";
import { IBoard } from "../board/IBoard";
import { ITask } from "../task/ITask";



export interface IData extends IEntity<string>{
    heading:string | null;
    title:string | null;
    content: string | null;
    boardId:string;
    // relationship
    board: IBoard;
    tasks: ITask[] | null;
}