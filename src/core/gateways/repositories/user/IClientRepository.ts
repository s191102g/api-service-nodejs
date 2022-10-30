import { Client } from "../../../domain/entities/user/Client";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";



export interface IClientRepository extends IBaseRepository<string,Client>{
    CheckUserExist(param:string): Promise<boolean>;
    getByEmail(email:string): Promise<Client | null>
}