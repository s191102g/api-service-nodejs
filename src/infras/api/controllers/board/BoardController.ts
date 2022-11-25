import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { CreateBoardHandler } from "../../../../core/usecases/board/create/CreateBoardHandler";
import { CreateBoardInput } from "../../../../core/usecases/board/create/CreateBoardInput";
import { CreateBoardOutput } from "../../../../core/usecases/board/create/CreateBoardOutput";
import { DeleteBoardHandler } from "../../../../core/usecases/board/delete-board/DeleteBoardHandler";
import { DeleteBoardOutput } from "../../../../core/usecases/board/delete-board/DeleteBoardOutput";
import { GetBoardByIdHandler } from "../../../../core/usecases/board/get-by-id/GetBroadByIdHandler";
import { GetBoardByIdOutput } from "../../../../core/usecases/board/get-by-id/GetBroadByIdOutput";
import { UpdateBoardHandler } from "../../../../core/usecases/board/update-board/UpdateBoardHandler";
import { UpdateBoardInput } from "../../../../core/usecases/board/update-board/UpdateBoardInput";
import { UpdateBoardOutput } from "../../../../core/usecases/board/update-board/UpdateBoardOutput";



@Service()
@JsonController("/v1/board")
export class BoardController {
    constructor(
         private readonly _createBoardHandler: CreateBoardHandler,
         private readonly _getBoardByIdHandler: GetBoardByIdHandler,
         private readonly _updateBoardHandler: UpdateBoardHandler,
         private readonly _deleteBoardHandler: DeleteBoardHandler
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
        return await this._getBoardByIdHandler.handle(id)
    }

    @Put("/:id([0-9a-f-]{36})")
    @Authorized(RoleType.Client)
    @OpenAPI({summary:"update board"})
    @ResponseSchema(UpdateBoardOutput)
    async update(
        @Param("id") id:string,
        @Body() param:UpdateBoardInput
    ): Promise<UpdateBoardOutput>{
        return await this._updateBoardHandler.handle(id,param)
    }

    @Delete("/:id([0-9a-f-]{36})")
    @Authorized()
    @OpenAPI({summary:"delete board"})
    @ResponseSchema(DeleteBoardOutput)
    async delete(
        @Param("id") id: string,
    ): Promise<DeleteBoardOutput>{
        return await this._deleteBoardHandler.handle(id)
    }
    

}