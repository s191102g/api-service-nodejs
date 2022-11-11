
import { Admin } from "../../../domain/entities/user/Admin";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";



export interface IAdminRepository extends IBaseRepository<string,Admin>{

    getByUsername(username:string): Promise<Admin | null>
}