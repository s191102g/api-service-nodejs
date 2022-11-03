import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Template } from "../../../domain/entities/template/Template";
import { ITemplateRepository } from "../../../gateways/repositories/template/ITemplateRepository";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { CreateTemplateInput } from "./CreateTeamplateInput";
import { CreateTemplateOutput } from "./CreateTemplateOutput";




@Service()
export class CreateTemplateHandler extends CommandHandler<
CreateTemplateInput,
CreateTemplateOutput
>{
    constructor(
        @Inject("template.repository")
        private readonly _templateRepository: ITemplateRepository
    ){
        super()
    }

    async handle(param:  CreateTemplateInput): Promise<CreateTemplateOutput> {
        await validateDataInput(param)

        const data= new Template()
        data.typeByString = param.typeByString;
        data.usageFields = param.usageField;

        const id = await this._templateRepository.create(data)
        const result = new CreateTemplateOutput()
        result.setData(id)
        return result;
    }

}