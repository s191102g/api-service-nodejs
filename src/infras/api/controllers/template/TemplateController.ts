import { Authorized, Body, Get, JsonController, Param, Post, QueryParams } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { CreateTemplateInput } from "../../../../core/usecases/template/create/CreateTeamplateInput";
import { CreateTemplateHandler } from "../../../../core/usecases/template/create/CreateTemplateHandler";
import { CreateTemplateOutput } from "../../../../core/usecases/template/create/CreateTemplateOutput";
import { FindTemplateHandler } from "../../../../core/usecases/template/find-template/FindTemplateHandler";
import { FindTemplateInput } from "../../../../core/usecases/template/find-template/FindTemplateInput";
import { FindTemplateOutput } from "../../../../core/usecases/template/find-template/FindTemplateOutput";
import { GetTemplateByIdHandler } from "../../../../core/usecases/template/get-by-id/GetTemplateByIdHandler";
import { GetTemplateByIdOutput } from "../../../../core/usecases/template/get-by-id/GetTemplateByIdOutput";





@Service()
@JsonController("/v1/template")
export class TemplateController {
    constructor(
        private readonly _createTemplateHandler: CreateTemplateHandler,
        private readonly _findTemplateHandler: FindTemplateHandler,
        private readonly _getTemplateByIdHandler: GetTemplateByIdHandler
    ){}

    @Post("/")
    @Authorized(RoleType.Admin)
    @OpenAPI({summary:"create new template"})
    @ResponseSchema(CreateTemplateOutput)
    async create(
        @Body() param: CreateTemplateInput
    ): Promise<CreateTemplateOutput>{
        return await this._createTemplateHandler.handle(param)
    }

    @Get("/")
    @Authorized(RoleType.Admin)
    @OpenAPI({summary:"find template"})
    @ResponseSchema(FindTemplateOutput)
    async findAndCount(
        @QueryParams() param: FindTemplateInput
    ): Promise<FindTemplateOutput>{
        return await this._findTemplateHandler.handle(param)
    }

    @Get("/:id([0-9a-f-]{36})")
    @Authorized()
    @OpenAPI({summary:"get template by id"})
    @ResponseSchema(GetTemplateByIdOutput)
    async getById(
        @Param("id") id: string,
    ): Promise<GetTemplateByIdOutput>{
        return await this._getTemplateByIdHandler.handle(id)
    }
}