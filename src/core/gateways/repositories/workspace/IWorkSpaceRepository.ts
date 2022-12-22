import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { DbPaginationFilter } from "../../../shared/database/DbPaginationFilter";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";


export class FindAllWorkspaceForAdminClientFilter extends DbPaginationFilter {
     keyword: string | null;
   }


export interface IWorkSpaceRepository extends IBaseRepository<string,WorkSpace>{
     findByUser(userId:string): Promise<WorkSpace[] >;
     checkNameExist(name:string): Promise<boolean>;
     getAll(): Promise<WorkSpace[]>;
     getByUserAndId(idUser:string, idWorkspace:string): Promise<WorkSpace | null>;
     findAndCount( param: FindAllWorkspaceForAdminClientFilter): Promise<[WorkSpace[], number]>;
     getByYear(yearStart:string,yearEnd:string):Promise<number>
}