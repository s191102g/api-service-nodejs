import { Client } from "../../../domain/entities/user/Client";
import { DbPaginationFilter } from "../../../shared/database/DbPaginationFilter";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";


export class FindAllClientFilter extends DbPaginationFilter {
    keyword: string | null;
  }
export interface IClientRepository extends IBaseRepository<string,Client>{
    CheckUserExist(param:string): Promise<boolean>;
    getByEmail(email:string): Promise<Client | null>;
    findAndCount( param: FindAllClientFilter): Promise<[Client[], number]>
}