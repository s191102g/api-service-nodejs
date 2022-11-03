import { Service } from "typedi";
import { Template } from "../../../../core/domain/entities/template/Template";
import { ITemplateRepository } from "../../../../core/gateways/repositories/template/ITemplateRepository";
import { TemplateDb } from "../../entities/template/TemplateDb";
import { TEMPLATE_SCHEMA } from "../../schemas/template/TemplateSchema";

import { BaseRepository } from "../base/BaseRepository";





@Service("template.repository")
export class BoardRepository extends BaseRepository<string, Template, TemplateDb>
 implements ITemplateRepository
{
    constructor(){
        super(TemplateDb,TEMPLATE_SCHEMA)
    }
}