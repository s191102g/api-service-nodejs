import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import crypto from "crypto";
import { ResendActiveInput } from "./ResendActiveInput";
import { ResendActiveOutput } from "./ResendactiveOutput";
import { IMailService } from "../../../../gateways/services/IMailService";




@Service()
export class ResendActiveHandler extends CommandHandler<
ResendActiveInput,
ResendActiveOutput
>{
    constructor(
        @Inject('client.repository')
        private readonly  _clientRepository: IClientRepository,
        @Inject('crypto.service')
        private readonly _cryptoServiceL: ICryptoService,
        
        @Inject("mail.service")
        private readonly _mailService: IMailService
    ){
        super()
    }

    async handle(param: ResendActiveInput): Promise<ResendActiveOutput> {
       await validateDataInput(param);
       
       const client = await this._clientRepository.getByEmail( this._cryptoServiceL.encrypt(param.email) )
       if(!client){
         throw new SystemError(MessageError.DATA_NOT_FOUND)
       }
       const data = new Client()
       const activeKey = crypto.randomBytes(4).toString("hex");
       data.activeKey = activeKey;
  
       await this._mailService.sendMailVertify(param.email, data.activeKey)

       const updated = await this._clientRepository.update(client.id, data);
       const result = new ResendActiveOutput();
       result.setData(updated);
       return result;
       
    }

}