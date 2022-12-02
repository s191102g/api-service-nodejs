import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { StatusType } from "../../../../domain/enums/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { BanClienInput } from "./BanClientInput";
import { BanClientOutput } from "./BanClientOutput";

@Service()
export class BanClientHandler extends CommandHandler<
BanClienInput,
BanClientOutput
>{
    constructor(
        @Inject("client.repository")
        private readonly _clientRepository: IClientRepository,
    
    ){
        super()
    }

    async handle(param: BanClienInput ): Promise<BanClientOutput> {
        await validateDataInput(param);

        const client  = await this._clientRepository.getById(param.idUser)
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const data = new Client()
        data.status = StatusType.Archived;

        const hasSuccess = await this._clientRepository.update(param.idUser,data)
        const result = new BanClientOutput()
        result.setData(hasSuccess)
        return result;
    }
}