import { Authorized, Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { CreateBoardHandler } from "../../../../core/usecases/board/create/CreateBoardHandler";
import { CreateBoardInput } from "../../../../core/usecases/board/create/CreateBoardInput";
import { CreateBoardOutput } from "../../../../core/usecases/board/create/CreateBoardOutput";



@Service()
@JsonController("/v1/board")
export class BoardController {
    constructor(
         private readonly _createBoardHandler: CreateBoardHandler
    ){}

    @Post("/")
    @Authorized()
    @OpenAPI({summary:"create board"})
    @ResponseSchema(CreateBoardOutput)
    async create(
           @Body() param: CreateBoardInput
    ): Promise<CreateBoardOutput>{
        return await this._createBoardHandler.handle(param)
    }
}