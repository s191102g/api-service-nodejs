import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { UpdateClientProfileInput } from "./UpdateClienProfiletInput";
import { UpdateClientProfileOutput } from "./UpdateClientProfileOutput";


@Service()
export class UpdateClientProfileHandler extends CommandHandler<
UpdateClientProfileInput,
UpdateClientProfileOutput
>{
    constructor(
        @Inject("client.repository")
        private readonly _clientRepository: IClientRepository,
    
    ){
        super()
    }

    async handle(userId:string, param:  UpdateClientProfileInput): Promise<UpdateClientProfileOutput> {
        await validateDataInput(param);
       
        const client = await this._clientRepository.getById(userId);
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const data = new Client()
        if(param.email)
        data.email = param.email;
        if(param.avatar)
        data.avatar = param.avatar;
        if(param.birthDay)
        data.birthDay = new Date(param.birthDay) ;
        if(param.firstName)
        data.firstName = param.firstName;
        if(param.gender)
        data.gender = param.gender;

        const success = await this._clientRepository.update(client.id, data)
        const result = new UpdateClientProfileOutput()
        result.setData(success)
        return result;

    }
}