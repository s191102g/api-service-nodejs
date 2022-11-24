import { Inject, Service } from "typedi";
import { IDataRepository } from "../../../gateways/repositories/datas/IDataRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { QueryHandler } from "../../../shared/usecase/QueryHandler";
import { GetDataByIdOutput } from "./GetDataByIdOutput";





@Service()
export class GetDataByIdHandler extends QueryHandler<
string,
GetDataByIdOutput
>{
    constructor(
        @Inject("data.repository")
        private readonly _dataRepository: IDataRepository
    ){
        super()
    }

    async handle(id: string ): Promise<GetDataByIdOutput> {
        const data= await this._dataRepository.getById(id)
        if(!data){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const result = new GetDataByIdOutput()
        result.setData(data)
        return result
    }
}