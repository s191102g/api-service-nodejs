
import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { RoleType, StatusType, TypeUse } from "../../../../domain/enums/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { RequireRegisterInput } from "./RequireRegisterInput";
import { RequireRegisterOutput } from "./RequireRegisterOutput";
import crypto from "crypto";
import { IMailService } from "../../../../gateways/services/IMailService";



@Service()
export class RequireRegisterHandler extends CommandHandler<
  RequireRegisterInput,
  RequireRegisterOutput
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

    async handle(param: RequireRegisterInput): Promise<RequireRegisterOutput> {
        await validateDataInput(param);

        const client = await this._clientRepository.getByEmail( this._cryptoServiceL.encrypt(param.email) )

        if(client === null){
              const data = new Client()
              data.email = param.email;
              data.status = StatusType.InActive;
              const activeKey = crypto.randomBytes(4).toString("hex");
              data.activeKey = activeKey;
              data.role = RoleType.Client;
              data.firstName = 'client';
              data.passWord = '1clientC.';
              data.typeUse = TypeUse.Normal;
              
              await this._clientRepository.create(data);
              await this._mailService.sendMailVertify(param.email, data.activeKey)
              const result = new RequireRegisterOutput()
              result.setData(true)
              return result;
        }

        if(client.typeUse === TypeUse.WithGG){
            throw new SystemError(MessageError.DATA_INVALID)
        }
        if(client.status == StatusType.InActive && client.email){
            throw new SystemError(MessageError.PARAM_NOT_ACTIVATED, "email")
        }
        const result = new RequireRegisterOutput()
        result.setData(false)
        return result;

        
    }

}