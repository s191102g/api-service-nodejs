import { Service } from "typedi";
import { Data } from "../../../../core/domain/entities/datas/Data";
import { IDataRepository } from "../../../../core/gateways/repositories/datas/IDataRepository";
import { DataDb } from "../../entities/datas/DataDb";
import { DATA_SCHEMA } from "../../schemas/datas/DataSchema";
import { BaseRepository } from "../base/BaseRepository";



@Service("data.repository")
export class DataRepository extends BaseRepository<string, Data, DataDb>
 implements IDataRepository
{
    constructor(){
        super(DataDb,DATA_SCHEMA)
    }

}