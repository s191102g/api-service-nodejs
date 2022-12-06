import { Task } from "../../../domain/entities/task/Task";
import { DbPaginationFilter } from "../../../shared/database/DbPaginationFilter";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";

export class FindTaskFilter extends DbPaginationFilter {
    keyword: string | null;
    dataId:string;
  }
export interface ITaskRepository extends IBaseRepository<string,Task>{
    findAndCount( param: FindTaskFilter): Promise<[Task[], number]>
}