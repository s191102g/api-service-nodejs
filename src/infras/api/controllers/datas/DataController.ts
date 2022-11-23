import { Service } from "typedi";
import { Authorized, Body,  JsonController, Param, Post, Put } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { CreateDataOutput } from "../../../../core/usecases/datas/create-data/CreateDataOutput";
import { CreateDataInput } from "../../../../core/usecases/datas/create-data/CreateDataInput";
import { CreateDataHandler } from "../../../../core/usecases/datas/create-data/CreateDataHandler";
import { UpdateDataOutput } from "../../../../core/usecases/datas/update-data/UpdateDataOutput";
import { UpdateDataInput } from "../../../../core/usecases/datas/update-data/UpdateDataInput";
import { UpdateDataHandler } from "../../../../core/usecases/datas/update-data/UpdateDataHandler";

@Service()
@JsonController("/v1/datas")
export class DatasController{
    constructor(
        private readonly _createDataHandler : CreateDataHandler,
        private readonly _updateDataHandler : UpdateDataHandler
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
}