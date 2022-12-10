import { Service } from "typedi";
import { Authorized, Body,  Delete,  Get,  JsonController, Param, Post, Put } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { CreateDataOutput } from "../../../../core/usecases/datas/create-data/CreateDataOutput";
import { CreateDataInput } from "../../../../core/usecases/datas/create-data/CreateDataInput";
import { CreateDataHandler } from "../../../../core/usecases/datas/create-data/CreateDataHandler";
import { UpdateDataOutput } from "../../../../core/usecases/datas/update-data/UpdateDataOutput";
import { UpdateDataInput } from "../../../../core/usecases/datas/update-data/UpdateDataInput";
import { UpdateDataHandler } from "../../../../core/usecases/datas/update-data/UpdateDataHandler";
import { GetDataByIdOutput } from "../../../../core/usecases/datas/get-data-by-id/GetDataByIdOutput";
import { GetDataByIdHandler } from "../../../../core/usecases/datas/get-data-by-id/GetDataByIdHandler";
import { DeleteDataHandler } from "../../../../core/usecases/datas/delete-data/DeleteDataHandler";
import { DeleteDataOutput } from "../../../../core/usecases/datas/delete-data/DeleteDataOutput";

@Service()
@JsonController("/v1/datas")
export class DatasController{
    constructor(
        private readonly _createDataHandler : CreateDataHandler,
        private readonly _updateDataHandler : UpdateDataHandler,
        private readonly _getDataByIdHandler : GetDataByIdHandler,
        private readonly _deleteDataHandler : DeleteDataHandler
    ){}

    @Post("/")
    @OpenAPI({summary: " Create data"})
    @Authorized(RoleType.Client)
    @ResponseSchema(CreateDataOutput)
    async create(

        @Body() param: CreateDataInput,
    ): Promise<CreateDataOutput> {
        return await this._createDataHandler.handle(param)
    }

    @Get("/:id([0-9a-f-]{36})")
    @Authorized()
    @OpenAPI({summary:"get data"})
    @ResponseSchema(GetDataByIdOutput)
    async getOne(
        @Param("id") id: string
    ): Promise<GetDataByIdOutput>{
        return await this._getDataByIdHandler.handle(id)
    }

    @Put("/:id([0-9a-f-]{36})")
    @OpenAPI({summary: "update data"})
    @Authorized(RoleType.Client)
    @ResponseSchema(UpdateDataOutput)
    async update(
        @Param("id") id:string,
        @Body() param: UpdateDataInput,
    ): Promise<UpdateDataOutput> {
        return await this._updateDataHandler.handle(id,param)
    }


    @Delete("/:id([0-9a-f-]{36})")
    @Authorized(RoleType.Client)
    @OpenAPI({summary:"delete data"})
    @ResponseSchema(DeleteDataOutput)
    async delete(
        @Param("id") id: string
    ): Promise<DeleteDataOutput>{
        return await this._deleteDataHandler.handle(id)
    }
}