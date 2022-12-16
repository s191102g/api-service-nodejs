import { Inject, Service } from "typedi";
import { IClientRepository } from "../../../gateways/repositories/user/IClientRepository";
import { IPaypalService } from "../../../gateways/services/IPaypalService";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { CreatePaymentOutput } from "./CreatePaymentOutput";



@Service()
export class CreatePaymentHandler extends CommandHandler<
string,
CreatePaymentOutput
>{
    constructor(
        @Inject('paypal.service')
        private readonly _paypalService: IPaypalService,
        @Inject("client.repository")
        private readonly _clientRepository: IClientRepository,
    ){
        super()
    }

    async handle(userId: string ): Promise<CreatePaymentOutput> {
        const client = await this._clientRepository.getById(userId)
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
        const link =  await this._paypalService.pay();

        const result = new CreatePaymentOutput()
        result.setData(String(link) )
        return result;
    }
}