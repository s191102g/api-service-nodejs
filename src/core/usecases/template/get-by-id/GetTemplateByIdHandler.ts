import { Inject, Service } from "typedi";
import { ITemplateRepository } from "../../../gateways/repositories/template/ITemplateRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { QueryHandler } from "../../../shared/usecase/QueryHandler";
import { GetTemplateByIdOutput } from "./GetTemplateByIdOutput";





@Service()
export class GetTemplateByIdHandler extends QueryHandler<
string,
GetTemplateByIdOutput
>{
    constructor(
        @Inject("template.repository")
        private readonly _templateRepository: ITemplateRepository
    ){
        super()
    }

    async handle(id: string ): Promise<GetTemplateByIdOutput> {
        const data= await this._templateRepository.getById(id)
        if(!data){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const result = new GetTemplateByIdOutput()
        result.setData(data)
        return result
    }
}