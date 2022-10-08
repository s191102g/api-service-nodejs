import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { RoleType } from "../../../../domain/enums/user/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
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
        private readonly  _clientRepository: IClientRepository
    ){
        super()
    }

    async handle(param:CreateClientInput): Promise<CreateClientOutput> {
        await validateDataInput(param)
        
        const data = new Client()
        data.firstName = param.firstName;
        data.lastName = param.lastName;
        data.userName = param.userName;
        data.passWord = param.passWord;
        data.email = param.email;
        data.role = RoleType.Client
        const isExit = await this._clientRepository.CheckUserExist(data.userName);
        if( isExit){
                throw new SystemError(MessageError.PARAM_EXISTED,"username")
        }
        const idCreated = await this._clientRepository.create(data)
        const result = new CreateClientOutput()
        result.setData(idCreated)
        return result
    }
    async handle2(param:CreateClientInput): Promise<any> {
        await validateDataInput(param)
        
        const data = new Client()
        data.firstName = param.firstName;
        data.lastName = param.lastName;
        data.userName = param.userName;
        data.passWord = param.passWord;
        data.email = param.email;
        data.role = RoleType.Client
       
        return  data.userName
    }
}