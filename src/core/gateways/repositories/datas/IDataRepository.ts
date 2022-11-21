
import { Data } from "../../../domain/entities/datas/Data";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";

export interface IDataRepository extends IBaseRepository<string,Data>{
    
}