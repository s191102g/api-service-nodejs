import { Inject, Service } from "typedi";
import { FindAllClientFilter, IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { QueryHandler } from "../../../../shared/usecase/QueryHandler";
import { FindAllClientInput } from "./FindAllClientInput";
import { FindAllCientOutput } from "./FindAllClientOutput";





@Service()
export class FindAllClientHandler extends QueryHandler<
FindAllClientInput,
FindAllCientOutput
>{
    constructor(
        @Inject('client.repository')
        private readonly  _clientRepository: IClientRepository,
    ){super()}

    async handle(param:  FindAllClientInput ): Promise<FindAllCientOutput> {
        const filter = new FindAllClientFilter();
        filter.setPagination(param.skip, param.limit);
        filter.keyword = param.keyword;
    
        const [clients, count] = await this._clientRepository.findAndCount(
          filter
        );
        const result = new FindAllCientOutput();
        result.setData(clients);
        result.setPagination(count, param.skip, param.limit);
        return result;
    }
}