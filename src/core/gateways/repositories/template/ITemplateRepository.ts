import { Template } from "../../../domain/entities/template/Template";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";


export interface ITemplateRepository extends IBaseRepository<string,Template>{
    
}