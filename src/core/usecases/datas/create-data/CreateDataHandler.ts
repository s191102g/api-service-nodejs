import { randomUUID } from "crypto";
import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Data } from "../../../domain/entities/datas/Data";
import { IBoardRepository } from "../../../gateways/repositories/board/IBoardRepository";
import { IDataRepository } from "../../../gateways/repositories/datas/IDataRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { CreateDataInput } from "./CreateDataInput";
import { CreateDataOutput } from "./CreateDataOutput";




@Service()
export class CreateDataHandler extends CommandHandler<
CreateDataInput,
CreateDataOutput
>{
    constructor(
        @Inject('board.repository')
        private readonly _broadRepository: IBoardRepository,
        @Inject("data.repository")
        private readonly _dataRepository: IDataRepository
    ){
        super()
    }

    async handle( param:  CreateDataInput ): Promise<CreateDataOutput> {
        await validateDataInput(param);
        const data = new Data();
       
        const board = await this._broadRepository.getById(param.boardId);
        if(!board){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
        data.boardId = param.boardId;
        if(param.content)
        data.content = param.content;
        if(param.title)
        data.title = param.title;
        if(param.heading){
            if(Array.isArray(param.heading)){
                for (let i = 0; i < param.heading.length; i++) {
                    data.id = randomUUID();
                    data.heading = param.heading[i];
                    data.content = String(i+1);
                    await  this._dataRepository.create(data);
                }
                const ranId =  randomUUID()
                const result = new CreateDataOutput()
                result.setData(ranId)
                return result;
            }else{
                data.heading = param.heading;
            }
            
        }
       

       
        const id = await this._dataRepository.create(data)
        const result = new CreateDataOutput()
        result.setData(id)
        return result;

    }
}