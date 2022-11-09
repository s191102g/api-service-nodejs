import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";




export interface IWorkSpaceRepository extends IBaseRepository<string,WorkSpace>{
     findByUser(userId:string): Promise<WorkSpace[] >;
     checkNameExist(name:string): Promise<boolean>;
     getAll(): Promise<WorkSpace[]>;
     getByUserAndId(idUser:string, idWorkspace:string): Promise<WorkSpace | null>;
}