import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { StatusType } from "../../../../domain/enums/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { UnbanClienInput } from "./UnbanClientInput";
import { UnbanClientOutput } from "./UnbanClientOutput";


@Service()
export class UnbanClientHandler extends CommandHandler<
UnbanClienInput,
UnbanClientOutput
>{
    constructor(
        @Inject("client.repository")
        private readonly _clientRepository: IClientRepository,
    
    ){
        super()
    }

    async handle(param: UnbanClienInput ): Promise<UnbanClientOutput> {
        await validateDataInput(param);

        const client  = await this._clientRepository.getById(param.idUser)
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const data = new Client()
        data.status = StatusType.Active;

        const hasSuccess = await this._clientRepository.update(param.idUser,data)
        const result = new UnbanClientOutput()
        result.setData(hasSuccess)
        return result;
    }
}