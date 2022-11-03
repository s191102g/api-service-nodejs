import { Authorized, Body, Get, JsonController, Param, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { CreateBoardHandler } from "../../../../core/usecases/board/create/CreateBoardHandler";
import { CreateBoardInput } from "../../../../core/usecases/board/create/CreateBoardInput";
import { CreateBoardOutput } from "../../../../core/usecases/board/create/CreateBoardOutput";
import { GetBoardByIdHandler } from "../../../../core/usecases/board/get-by-id/GetBroadByIdHandler";
import { GetBoardByIdOutput } from "../../../../core/usecases/board/get-by-id/GetBroadByIdOutput";



@Service()
@JsonController("/v1/board")
export class BoardController {
    constructor(
         private readonly _createBoardHandler: CreateBoardHandler,
         private readonly _getBroadByIdHandler: GetBoardByIdHandler
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


    @Get("/:id([0-9a-f-]{36})")
    @Authorized()
    @OpenAPI({summary:"get broad"})
    @ResponseSchema(GetBoardByIdOutput)
    async getOne(
        @Param("id") id: string
    ): Promise<GetBoardByIdOutput>{
        return await this._getBroadByIdHandler.handle(id)
    }
    

}