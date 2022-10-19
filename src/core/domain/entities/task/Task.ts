import { ITask } from "../../interfaces/task/ITask";
import { BaseEntity } from "../base/BaseEntyti";
import { Data } from "../datas/Data";


export class Task extends BaseEntity<string,ITask> implements ITask{
    get title(): string{
          return this.data.title
    }
    set title(val:string){
        this.data.title = val
    }

    get content(): string{
return this.data.content
    }
    set content(val:string){
        this.data.content = val
    }

    get position(): number{
        return this.data.position
    }
    set position(val:number){
        this.data.position = val
    }

    get dataId(): string{
        return this.data.dataId
    }
    set dataId(val:string){
        this.data.dataId = val
    }

    // relationship

    get datas(): Data{
          return this.data.datas && new Data(this.data.datas)
    }
}