import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Data } from "../../../../core/domain/entities/datas/Data";
import { IBoard } from "../../../../core/domain/interfaces/board/IBoard";
import { IData } from "../../../../core/domain/interfaces/datas/IData";
import { ITask } from "../../../../core/domain/interfaces/task/ITask";
import { DATA_SCHEMA } from "../../schemas/datas/DataSchema";
import { BaseDbEntity } from "../base/BaseDbEntity";
import { BoardDb } from "../board/BoardDb";
import { TaskDb } from "../task/TaskDb";




@Entity(DATA_SCHEMA.TABLE_NAME)
export class DataDb extends BaseDbEntity<string,IData> implements IData{
  
    @Column("varchar",{name:DATA_SCHEMA.COLUMNS.HEADING, length:200, nullable:true})
    heading: string;

    @Column("varchar",{name:DATA_SCHEMA.COLUMNS.TITLE, length:200, nullable:true})
    title: string | null;

    @Column("text",{name:DATA_SCHEMA.COLUMNS.CONTENT, nullable:true})
    content: string | null;

    @Column("uuid",{name:DATA_SCHEMA.COLUMNS.BOARD_ID})
    @Index()
    boardId: string;
    // relationship
    @ManyToOne(()=>BoardDb, (board)=>board.datas)
    @JoinColumn({name:DATA_SCHEMA.COLUMNS.BOARD_ID})
    board: IBoard;

    @OneToMany(()=> TaskDb, (tasks)=> tasks.datas)
    tasks: ITask[] | null;

    
    toEntity(): Data {
        return new Data(this)
    }
    fromEntity(entity: Data): IData {
       return entity.toData()
    }

}