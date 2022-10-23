import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Board } from "../../../domain/entities/board/Board";
import { FavouriteType } from "../../../domain/enums/user/boardEnum";
import { IBoardRepository } from "../../../gateways/repositories/board/IBoardRepository";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { CreateBoardInput } from "./CreateBoardInput";
import { CreateBoardOutput } from "./CreateBoardOutput";




@Service()
export class CreateBoardHandler extends CommandHandler<
   CreateBoardInput,
   CreateBoardOutput
>{
   constructor(
    @Inject("board.repository")
      private readonly _boardReposiory: IBoardRepository
   ){
     super()
   }

   async handle(param: CreateBoardInput): Promise<CreateBoardOutput> {
       await validateDataInput(param)

       const data = new Board()
       data.title = param.title;
       data.position = param.position;
       data.icon = param.icon;
       data.favourite = param.favourite === true ? FavouriteType.Favourite : FavouriteType.UnFavourite;
       data.favouritePosition = param.favouritePosition;
       data.workSpaceId = param.workspaceId;
       data.templateId = param.templateId;


       const create = await  this._boardReposiory.create(data);
       const result = new CreateBoardOutput()
       result.setData(create);
       return result
   }
}