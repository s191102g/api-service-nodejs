import { Inject, Service } from "typedi";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { GetClientProfileOutput } from "./GetClientProfileOutput";



@Service()
export class GetClientProfileHandler extends CommandHandler<
string,
GetClientProfileOutput
>{
    constructor(
        @Inject("client.repository")
        private readonly _clientRepository: IClientRepository,
    
    ){
        super()
    }

    async handle(param: string ): Promise<GetClientProfileOutput> {
        const client = await this._clientRepository.getById(param);
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const result = new GetClientProfileOutput()
        result.setData(client);
        return result;
    }


}