
import { IData } from "../../interfaces/datas/IData";
import { BaseEntity } from "../base/BaseEntyti";
import { Board } from "../board/Board";
import { Task } from "../task/Task";


export class Data extends BaseEntity<string,IData> implements IData{
    get heading(): string{
        return this.data.heading;
    }
    set heading(val: string){
        this.data.heading = val
    }

    get boardId(): string{
        return this.data.boardId
    }

    set boardId(val:string){
       this.data.boardId = val
    }

    // relationship

    get board(): Board{
          return this.data.board && new Board(this.data.board)
    }

    get tasks(): Task[]{
        return this.data.tasks &&  this.data.tasks.map((e)=> new Task(e))
    }
}