import { ITemplate } from "../../../domain/interfaces/template/ITemplate";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";


export interface ITemplateRepository extends IBaseRepository<string,ITemplate>{
    
}