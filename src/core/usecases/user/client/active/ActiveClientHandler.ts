import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { StatusType } from "../../../../domain/enums/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { ActiveClientInput } from "./ActiveClientInput";
import { ActiveClientOutput } from "./ActiveClientOutput";




@Service()
export class ActiveClientHandler extends CommandHandler<
ActiveClientInput,
ActiveClientOutput
>{
    constructor(
        @Inject('client.repository')
        private readonly  _clientRepository: IClientRepository,
        @Inject('crypto.service')
        private readonly _cryptoServiceL: ICryptoService
    ){
        super()
    }

    async handle(param: ActiveClientInput): Promise<ActiveClientOutput> {
       await validateDataInput(param);
       
       const client = await this._clientRepository.getByEmail( this._cryptoServiceL.encrypt(param.email) )
       if(!client){
         throw new SystemError(MessageError.DATA_NOT_FOUND)
       }
       if(client.activeKey !== param.activeKey){
        throw new SystemError(MessageError.PARAM_INCORRECT," activeKey");
       }
       const data = new Client();
       data.activeKey = null;
       data.status = StatusType.Active;
       const updated = await this._clientRepository.update(client.id, data);
       const result = new ActiveClientOutput();
       result.setData(updated);
       return result;
       
    }

}