import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { CreateClientInput } from "./CreateClientInput";
import { CreateClientOutput } from "./CreateClientOutput";



@Service()
export class CreateClientHandler extends CommandHandler<
   CreateClientInput,
   CreateClientOutput
>{
    constructor(
        @Inject('client.repository')
        private readonly  _clientRepository: IClientRepository,

        @Inject('crypto.service')
        private readonly _cryptoService: ICryptoService

    ){
        super()
    }

    async handle(param:CreateClientInput): Promise<CreateClientOutput> {
        await validateDataInput(param)
        
        const data = new Client()
        data.firstName = param.firstName;
        data.passWord = param.password;
        data.avatar = param.image;
        const client = await this._clientRepository.getByEmail( this._cryptoService.encrypt(param.email) )
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        if(client.activeKey){
            throw new SystemError(MessageError.DATA_INVALID)
        }
        const idCreated = await this._clientRepository.update(client.id, data);
        const result = new CreateClientOutput();
        result.setData(idCreated);
        return result
    }
}