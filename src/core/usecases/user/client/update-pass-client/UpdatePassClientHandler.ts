import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { UpdatePassClientInput } from "./UpdatePassClientInput";
import { UpdatePassClientOutput } from "./UpdatePassClientOutput";



@Service()
export class UpdatePassClientHandler extends CommandHandler<
UpdatePassClientInput,
UpdatePassClientOutput
>{
    constructor(
        @Inject("client.repository")
        private readonly _clientRepository: IClientRepository,
    ){
        super()
    }

    async handle(userId: string , param: UpdatePassClientInput ): Promise<UpdatePassClientOutput> {
        await validateDataInput(param)
        const client = await this._clientRepository.getById(userId);
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
        if (!client.comparePassword(param.oldPass)) {
            throw new SystemError(MessageError.PARAM_INCORRECT,"password")
        }

        const data = new Client()
        data.passWord = param.newPass;

        const success = await this._clientRepository.update(client.id, data)
        const result = new UpdatePassClientOutput()
        result.setData(success)
        return result;
    }
}