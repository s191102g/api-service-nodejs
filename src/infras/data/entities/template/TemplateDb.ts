import { Column, Entity, Index, OneToMany } from "typeorm";
import { Template } from "../../../../core/domain/entities/template/Template";
import { IBoard } from "../../../../core/domain/interfaces/board/IBoard";
import { ITemplate } from "../../../../core/domain/interfaces/template/ITemplate";
import { TEMPLATE_SCHEMA } from "../../schemas/template/TemplateSchema";
import { BaseDbEntity } from "../base/BaseDbEntity";
import { BoardDb } from "../board/BoardDb";




@Entity(TEMPLATE_SCHEMA.TABLE_NAME)
export class TemplateDb extends BaseDbEntity<string,Template> implements ITemplate{
  
    @Column("varchar", {name:TEMPLATE_SCHEMA.COLUMNS.TYPE_BY_STRING, length:50})
    @Index({unique:true, where:TemplateDb.getIndexFilterDeletedColumn()})
    typeByString: string;

    @Column("jsonb", {name:TEMPLATE_SCHEMA.COLUMNS.USAGE_FIELDS})
    usageFields: any[];

    toEntity(): Template {
        return new Template(this)
    }
    fromEntity(entity: Template): ITemplate {
        return entity.toData()
    }

    @OneToMany(()=> BoardDb, (board)=>board.template)
    board:IBoard
    
}