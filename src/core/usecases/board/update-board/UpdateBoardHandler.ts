import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Board } from "../../../domain/entities/board/Board";
import { IBoardRepository } from "../../../gateways/repositories/board/IBoardRepository";
import { ITemplateRepository } from "../../../gateways/repositories/template/ITemplateRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { UpdateBoardInput } from "./UpdateBoardInput";
import { UpdateBoardOutput } from "./UpdateBoardOutput";



@Service()
export class UpdateBoardHandler extends CommandHandler<
UpdateBoardInput,
UpdateBoardOutput
>{
    constructor(
        @Inject("board.repository")
        private readonly _boardReposiory: IBoardRepository,
        @Inject("template.repository")
        private readonly _templateRepository: ITemplateRepository
    ){
        super()
    }

    async handle(id:string, param: UpdateBoardInput ): Promise<UpdateBoardOutput> {
        await validateDataInput(param);
        const board = await this._boardReposiory.getById(id);
        if(!board){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        if(board.workSpaceId !== param.workspaceId){
            throw new SystemError(MessageError.PARAM_INCORRECT,"worksapceId")
        }

        const data= new Board();
        if(param.title)
        data.title = param.title;
        if(param.description)
        data.description = param.description;
        if(param.icon)
        data.icon = param.icon;
        if(param.templateId){
               const template = await this._templateRepository.getById(param.templateId)
               if(!template){
                throw new SystemError(MessageError.PARAM_INCORRECT,"template")
               }
               data.templateId = param.templateId
        }

        const hasSuccess = await this._boardReposiory.update(board.id, data)
        const result = new UpdateBoardOutput();
        result.setData(hasSuccess);
        return result;

    }
}