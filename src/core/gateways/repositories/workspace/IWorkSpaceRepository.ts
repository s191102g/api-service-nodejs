import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IWorkSpace } from "../../../domain/interfaces/workspace/IWorkSpace";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";




export interface IWorkSpaceRepository extends IBaseRepository<string,IWorkSpace>{
     findByUser(userId:string): Promise<WorkSpace[] >
}