
import { Inject, Service } from "typedi";
import { Data } from "../../../domain/entities/datas/Data";
import { IDataRepository } from "../../../gateways/repositories/datas/IDataRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { DeleteDataOutput } from "./DeleteDataOutput";





@Service()
export class DeleteDataHandler extends CommandHandler<
string,
DeleteDataOutput
>{
    constructor(
        @Inject("data.repository")
        private readonly _dataRepository: IDataRepository
    ){
        super()
    }

    async handle(id:string): Promise<DeleteDataOutput> {
        const data = new Data();
        const datas = await this._dataRepository.getById(id);
        if(!datas){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
       
        const isSuccess = await this._dataRepository.update( id,data)
        const result = new DeleteDataOutput()
        result.setData(isSuccess)
        return result;

    }
}

