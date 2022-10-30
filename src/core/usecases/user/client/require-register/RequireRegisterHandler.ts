
import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { StatusType } from "../../../../domain/enums/user/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { RequireRegisterInput } from "./RequireRegisterInput";
import { RequireRegisterOutput } from "./RequireRegisterOutput";
import crypto from "crypto";



@Service()
export class RequireRegisterHandler extends CommandHandler<
  RequireRegisterInput,
  RequireRegisterOutput
>{
    constructor(
        @Inject('client.repository')
        private readonly  _clientRepository: IClientRepository,

        @Inject('crypto.service')
        private readonly _cryptoServiceL: ICryptoService
    ){
        super()
    }

    async handle(param: RequireRegisterInput): Promise<RequireRegisterOutput> {
        await validateDataInput(param);

        const client = await this._clientRepository.getByEmail( this._cryptoServiceL.encrypt(param.email) )

        if(client === null){
              const data = new Client()
              data.email = param.email;
              data.status = StatusType.InActive;
              const activeKey = crypto.randomBytes(4).toString("hex");
              data.activeKey = activeKey;

              await this._clientRepository.create(data);
              const result = new RequireRegisterOutput()
              result.setData(true)
              return result;
        }else{
            if(client.status == StatusType.InActive && client.email){
                throw new SystemError(MessageError.PARAM_NOT_ACTIVATED, "email")
            }
            const result = new RequireRegisterOutput()
            result.setData(false)
            return result;
        }

        
    }

}