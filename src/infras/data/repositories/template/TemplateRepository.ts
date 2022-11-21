import { Service } from "typedi";
import { Template } from "../../../../core/domain/entities/template/Template";
import { FindTemplateFilter, ITemplateRepository } from "../../../../core/gateways/repositories/template/ITemplateRepository";
import { TemplateDb } from "../../entities/template/TemplateDb";
import { TEMPLATE_SCHEMA } from "../../schemas/template/TemplateSchema";

import { BaseRepository } from "../base/BaseRepository";





@Service("template.repository")
export class TemplateRepository extends BaseRepository<string, Template, TemplateDb>
 implements ITemplateRepository
{
    constructor(){
        super(TemplateDb,TEMPLATE_SCHEMA)
    }

    override async findAndCount(
        param: FindTemplateFilter
      ): Promise<[Template[], number]> {
        let query = this.repository.createQueryBuilder(TEMPLATE_SCHEMA.TABLE_NAME);
    
        if (param.keyword) {
          const keyword = `%${param.keyword}%`;
          query = query.andWhere(
            `${TEMPLATE_SCHEMA.TABLE_NAME}.${TEMPLATE_SCHEMA.COLUMNS.TYPE_BY_STRING} ILIKE :keyword`,
            { keyword }
          );
        }
    
        query = query.skip(param.skip).take(param.limit);
    
        const [list, count] = await query.getManyAndCount();
        return [list.map((item) => item.toEntity()), count];
      }
}