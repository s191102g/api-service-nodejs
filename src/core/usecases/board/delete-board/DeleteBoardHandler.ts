import { Inject, Service } from "typedi";
import { IBoardRepository } from "../../../gateways/repositories/board/IBoardRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { DeleteBoardOutput } from "./DeleteBoardOutput";


@Service()
export class DeleteBoardHandler extends CommandHandler<
string,
DeleteBoardOutput
>{
    constructor(
        @Inject("board.repository")
        private readonly _boardReposiory: IBoardRepository
    ){
      super()
    }

    async handle(id: string ): Promise<DeleteBoardOutput> {
        const board = await this._boardReposiory.getById(id);
        if(!board){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const hasSuccess = await this._boardReposiory.softDelete(id)
        const result = new DeleteBoardOutput()
        result.setData(hasSuccess)
        return result;
    }
}