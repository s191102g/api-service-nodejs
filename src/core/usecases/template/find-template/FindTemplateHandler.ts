import { Inject, Service } from "typedi";
import {  FindTemplateFilter, ITemplateRepository } from "../../../gateways/repositories/template/ITemplateRepository";
import { QueryHandler } from "../../../shared/usecase/QueryHandler";
import { FindTemplateInput } from "./FindTemplateInput";
import { FindTemplateOutput } from "./FindTemplateOutput";




@Service()
export class FindTemplateHandler extends QueryHandler<
FindTemplateInput,
FindTemplateOutput
>{
    constructor(
        @Inject("template.repository")
        private readonly _templateRepository: ITemplateRepository
    ){
        super()
    }

    async handle(param:FindTemplateInput ): Promise<FindTemplateOutput> {
        const filter = new FindTemplateFilter();
        filter.setPagination(param.skip, param.limit);
        filter.keyword = param.keyword;
    
        const [tempalte, count] = await this._templateRepository.findAndCount(
          filter
        );
        const result = new FindTemplateOutput();
        result.setData(tempalte);
        result.setPagination(count, param.skip, param.limit);
        return result;
    }

}