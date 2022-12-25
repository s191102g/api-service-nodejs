import { Inject, Service } from "typedi";
import { Client } from "../../../../domain/entities/user/Client";
import { Pay } from "../../../../domain/enums/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { UpgradeClientOutput } from "./UpgradeClientOutput";



@Service()
export class UpgradeClientHandler extends CommandHandler<
string,
UpgradeClientOutput
>{
    constructor(
        @Inject("client.repository")
        private readonly _clientRepository: IClientRepository,
    ){
        super()
    }

    async handle(userId: string): Promise<UpgradeClientOutput> {
        const client = await this._clientRepository.getById(userId);
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const data = new Client()
        data.pay = Pay.IsPay

        const success = await this._clientRepository.update(client.id, data)
        const result = new UpgradeClientOutput()
        result.setData(success)
        return result;
    }
}