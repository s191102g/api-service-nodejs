import { Template } from "../../../domain/entities/template/Template";
import { DbPaginationFilter } from "../../../shared/database/DbPaginationFilter";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";

export class FindTemplateFilter extends DbPaginationFilter {
    keyword: string | null;
  }
export interface ITemplateRepository extends IBaseRepository<string,Template>{
    findAndCount( param: FindTemplateFilter): Promise<[Template[], number]>
}