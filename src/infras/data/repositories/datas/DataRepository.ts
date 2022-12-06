import { Service } from "typedi";
import { Data } from "../../../../core/domain/entities/datas/Data";
import { IDataRepository } from "../../../../core/gateways/repositories/datas/IDataRepository";
import { DataDb } from "../../entities/datas/DataDb";
import { DATA_SCHEMA } from "../../schemas/datas/DataSchema";
import { TASK_SCHEMA } from "../../schemas/task/TaskSchema";
import { BaseRepository } from "../base/BaseRepository";



@Service("data.repository")
export class DataRepository extends BaseRepository<string, Data, DataDb>
 implements IDataRepository
{
    constructor(){
        super(DataDb,DATA_SCHEMA)
    }

    override  async getById(
        id: string
       
      ): Promise<Data | null> {
        const result = await this.repository
          .createQueryBuilder(DATA_SCHEMA.TABLE_NAME)
          .leftJoinAndSelect(
            `${DATA_SCHEMA.TABLE_NAME}.${DATA_SCHEMA.RELATED_MANY.TASK}`, `${TASK_SCHEMA.TABLE_NAME}`
          )
          .whereInIds(id)
          .getOne();
        return result ? result.toEntity() : null;
      }
}