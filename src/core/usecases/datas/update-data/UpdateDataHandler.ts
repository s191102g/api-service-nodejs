import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Data } from "../../../domain/entities/datas/Data";
import { IBoardRepository } from "../../../gateways/repositories/board/IBoardRepository";
import { IDataRepository } from "../../../gateways/repositories/datas/IDataRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";

import { UpdateDataInput } from "./UpdateDataInput";
import { UpdateDataOutput } from "./UpdateDataOutput";




@Service()
export class UpdateDataHandler extends CommandHandler<
UpdateDataInput,
UpdateDataOutput
>{
    constructor(
        @Inject('board.repository')
        private readonly _broadRepository: IBoardRepository,
        @Inject("data.repository")
        private readonly _dataRepository: IDataRepository
    ){
        super()
    }

    async handle(id:string, param:UpdateDataInput): Promise<UpdateDataOutput> {
        await validateDataInput(param)

        const data = new Data();
        const datas = await this._dataRepository.getById(id);
        if(!datas){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
       
        const board = await this._broadRepository.getById(param.boardId);
        if(!board){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
     
     
        data.boardId = param.boardId;
        if(param.content)
        data.content = param.content;
        if(param.title)
        data.title = param.title;
        if(param.heading)
        data.heading = param.heading;

       
        const isSuccess = await this._dataRepository.update( id,data)
        const result = new UpdateDataOutput()
        result.setData(isSuccess)
        return result;

    }
}