import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Board } from "../../../../core/domain/entities/board/Board";
import { FavouriteType } from "../../../../core/domain/enums/boardEnum";
import { IBoard } from "../../../../core/domain/interfaces/board/IBoard";
import { IData } from "../../../../core/domain/interfaces/datas/IData";
import { ITemplate } from "../../../../core/domain/interfaces/template/ITemplate";
import { IWorkSpace } from "../../../../core/domain/interfaces/workspace/IWorkSpace";
import { BOARD_SCHEMA } from "../../schemas/board/BoardSchema";
import { BaseDbEntity } from "../base/BaseDbEntity";
import { DataDb } from "../datas/DataDb";
import { TemplateDb } from "../template/TemplateDb";
import { WorkSpaceDb } from "../workspace/WorkSpaceDb";



@Entity(BOARD_SCHEMA.TABLE_NAME)
export class BoardDb extends BaseDbEntity<string,IBoard> implements IBoard{    
  
     @Column("varchar",{name:BOARD_SCHEMA.COLUMNS.TITLE, length:200, nullable:true})
     @Index({ where:BoardDb.getIndexFilterDeletedColumn()})
     title: string;

     @Column("varchar",{name:BOARD_SCHEMA.COLUMNS.ICON,length:1000, nullable:true})
     icon: string;

     @Column("integer",{name:BOARD_SCHEMA.COLUMNS.POSITION, nullable:true})
     position: number;

     @Column("text",{name:BOARD_SCHEMA.COLUMNS.DESCRIPTION, nullable:true})
     description: string;

     @Column("enum",{name: BOARD_SCHEMA.COLUMNS.FAVOURITE,enum: FavouriteType,default: FavouriteType.UnFavourite,})
     favourite: FavouriteType;

     @Column("integer",{name:BOARD_SCHEMA.COLUMNS.FAVOURITE_POSITION, nullable: true })
     favouritePosition: number;
     
     @Column("uuid",{name:BOARD_SCHEMA.COLUMNS.WORKSPACE_ID})
     @Index()
     workSpaceId: string;

     @Column("uuid",{name:BOARD_SCHEMA.COLUMNS.TEMPLATE_ID})
     @Index()
     templateId: string;

    //  relationship
    @ManyToOne(()=> WorkSpaceDb, (workSpace)=>workSpace.board)
    @JoinColumn({name:BOARD_SCHEMA.COLUMNS.WORKSPACE_ID})
    workSpace: IWorkSpace;

    @ManyToOne(()=>TemplateDb, (template)=>template.board)
    @JoinColumn({name:BOARD_SCHEMA.COLUMNS.TEMPLATE_ID})
    template: ITemplate;

    @OneToMany(()=>DataDb, (datas)=>datas.board)
    datas: IData[];
    toEntity(): Board {
        return new Board(this)
     }
     fromEntity(entity: Board): IBoard {
        return entity.toData()
     }
}