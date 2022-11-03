import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { CreateTemplateInput } from "../../../../core/usecases/template/create/CreateTeamplateInput";
import { CreateTemplateHandler } from "../../../../core/usecases/template/create/CreateTemplateHandler";
import { CreateTemplateOutput } from "../../../../core/usecases/template/create/CreateTemplateOutput";





@Service()
@JsonController("/v1/template")
export class TemplateController {
    constructor(
        private readonly _createTemplateHandler: CreateTemplateHandler
    ){}

    @Post("/")
    @OpenAPI({summary:"create new template"})
    @ResponseSchema(CreateTemplateOutput)
    async create(
        @Body() param: CreateTemplateInput
    ): Promise<CreateTemplateOutput>{
        return await this._createTemplateHandler.handle(param)
    }
}