import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Board } from "../../../domain/entities/board/Board";
import { FavouriteType } from "../../../domain/enums/boardEnum";

import { IBoardRepository } from "../../../gateways/repositories/board/IBoardRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { HandleOption } from "../../../shared/usecase/HandleOption";
import { CreateBoardInput } from "./CreateBoardInput";
import { CreateBoardOutput } from "./CreateBoardOutput";




@Service()
export class CreateBoardWhenCreateClientHandler extends CommandHandler<
   CreateBoardInput,
   CreateBoardOutput
>{
   constructor(
    @Inject("board.repository")
      private readonly _boardReposiory: IBoardRepository
   ){
     super()
   }

   async handle(param: CreateBoardInput, handleOption:HandleOption): Promise<CreateBoardOutput> {
       await validateDataInput(param)

       const data = new Board()
       data.title = param.title;
       data.position = param.position;
       data.description = param.description;
       data.icon = param.icon;
       data.favourite = param.favourite === 'yes' ? FavouriteType.Favourite : FavouriteType.UnFavourite;
       data.favouritePosition = param.favouritePosition;
       data.workSpaceId = param.workspaceId;
       data.templateId = param.templateId;

       const boards = await this._boardReposiory.getByWorkspaceId(param.workspaceId);
       if (!boards) {
            throw new SystemError(MessageError.PARAM_INCORRECT, "workspaceId")
       }

       const create = await  this._boardReposiory.create(data, handleOption.queryRunner);
       const result = new CreateBoardOutput()
       result.setData(create);
       return result
   }
}