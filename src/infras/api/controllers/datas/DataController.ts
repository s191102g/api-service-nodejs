import { Service } from "typedi";
import { Authorized, Body,  JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { CreateDataOutput } from "../../../../core/usecases/datas/create-data/CreateDataOutput";
import { CreateDataInput } from "../../../../core/usecases/datas/create-data/CreateDataInput";
import { CreateDataHandler } from "../../../../core/usecases/datas/create-data/CreateDataHandler";

@Service()
@JsonController("/v1/datas")
export class DatasController{
    constructor(
        private readonly _createDataHandler : CreateDataHandler
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
}