import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "../../../../core/domain/entities/task/Task";
import { IData } from "../../../../core/domain/interfaces/datas/IData";
import { ITask } from "../../../../core/domain/interfaces/task/ITask";
import { TASK_SCHEMA } from "../../schemas/task/TaskSchema";
import { BaseDbEntity } from "../base/BaseDbEntity";
import { DataDb } from "../datas/DataDb";



@Entity(TASK_SCHEMA.TABLE_NAME)
export class TaskDb extends BaseDbEntity<string,ITask> implements ITask{
   
    @Column("varchar",{name:TASK_SCHEMA.COLUMNS.TITLE, length:200})
    @Index({unique:true, where:TaskDb.getIndexFilterDeletedColumn()})
    title: string;

    @Column("text",{name:TASK_SCHEMA.COLUMNS.CONTENT})
    content: string;

    @Column("integer",{name:TASK_SCHEMA.COLUMNS.POSITION})
    position: number;

    @Column("uuid",{name:TASK_SCHEMA.COLUMNS.DATA_ID})
    dataId: string;

    // relationship 
    @ManyToOne(()=> DataDb, (datas)=> datas.tasks)
    @JoinColumn({name:TASK_SCHEMA.COLUMNS.DATA_ID})
    datas: IData;

    toEntity(): Task {
        return new Task(this);
    }
    fromEntity(entity: Task): ITask {
        return entity.toData()
    }
}