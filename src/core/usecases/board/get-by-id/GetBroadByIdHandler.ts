import { Inject, Service } from "typedi";
import { IBoardRepository } from "../../../gateways/repositories/board/IBoardRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { QueryHandler } from "../../../shared/usecase/QueryHandler";
import { GetBoardByIdOutput } from "./GetBroadByIdOutput";





@Service()
export class GetBoardByIdHandler extends QueryHandler<
string,
GetBoardByIdOutput
>{
    constructor(
        @Inject('board.repository')
        private readonly _broadRepository: IBoardRepository
    ){
        super()
    }

    async handle(id: string ): Promise<GetBoardByIdOutput> {
        const data= await this._broadRepository.getById(id)
        if(!data){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const result = new GetBoardByIdOutput()
        result.setData(data)
        return result
    }
}