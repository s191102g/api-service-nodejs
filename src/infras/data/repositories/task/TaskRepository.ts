import { Service } from "typedi";
import { Task } from "../../../../core/domain/entities/task/Task";
import { FindTaskFilter, ITaskRepository } from "../../../../core/gateways/repositories/task/ITaskRepository";
import { TaskDb } from "../../entities/task/TaskDb";
import { TASK_SCHEMA } from "../../schemas/task/TaskSchema";
import { BaseRepository } from "../base/BaseRepository";





@Service("task.repository")
export class TaskRepository extends BaseRepository<string, Task, TaskDb>
 implements ITaskRepository
{
    constructor(){
        super(TaskDb,TASK_SCHEMA)
    }

    override async findAndCount(
        param: FindTaskFilter
      ): Promise<[Task[], number]> {
        let query = this.repository.createQueryBuilder(TASK_SCHEMA.TABLE_NAME);
         
        const dataId = param.dataId;
        query.where(
          `${TASK_SCHEMA.TABLE_NAME}.${TASK_SCHEMA.COLUMNS.DATA_ID} = :dataId `,
          {dataId}
        )
        if (param.keyword) {
          const keyword = `%${param.keyword}%`;
          query = query.andWhere(
            `${TASK_SCHEMA.TABLE_NAME}.${TASK_SCHEMA.COLUMNS.TITLE} ILIKE :keyword`,
            { keyword }
          );
        }
        
    
        query = query.skip(param.skip).take(param.limit);
    
        const [list, count] = await query.getManyAndCount();
        return [list.map((item) => item.toEntity()), count];
      }

      async getByYear(yearStart:string,yearEnd:string):Promise<number>{
        let query = this.repository
        .createQueryBuilder(TASK_SCHEMA.TABLE_NAME)
       .where(
        `${TASK_SCHEMA.TABLE_NAME}.${TASK_SCHEMA.COLUMNS.CREATED_AT} > :yearStart`,
        {yearStart}
       )
       .andWhere(
        `${TASK_SCHEMA.TABLE_NAME}.${TASK_SCHEMA.COLUMNS.CREATED_AT} < :yearEnd`,
        {yearEnd}
       )
       const result = await query.getCount()
       return result;
      }
}