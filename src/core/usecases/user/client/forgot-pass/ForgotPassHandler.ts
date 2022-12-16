import { randomBytes } from "crypto";
import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { StatusType, TypeUse } from "../../../../domain/enums/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { IMailService } from "../../../../gateways/services/IMailService";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler"
import { ForgotPassInput } from "./ForgotPassInput";
import { ForgotPassOutput } from "./ForgotPassOutput";



@Service()
export class ForgotPassHandler extends CommandHandler<
ForgotPassInput,
ForgotPassOutput
>{
    constructor(
        @Inject("client.repository")
        private readonly _clientRepository: IClientRepository,
        @Inject('crypto.service')
        private readonly _cryptoServiceL: ICryptoService,

        @Inject("mail.service")
        private readonly _mailService: IMailService
    ){
        super()
    }

    async handle(param: ForgotPassInput ): Promise<ForgotPassOutput> {
        await validateDataInput(param);

        const client = await this._clientRepository.getByEmail(this._cryptoServiceL.encrypt(param.email))
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        if(client.typeUse === TypeUse.WithGG){
            throw new SystemError(MessageError.DATA_INVALID)
        }

        if(client.status === StatusType.InActive){
            throw new SystemError(MessageError.UNAUTHORIZED)
        }

        if(client.status == StatusType.Archived){
            throw new SystemError(MessageError.PARAM_IS_BANED,'account')
        }

        const data= new Client()
        const newPass = randomBytes(4).toString("hex");
        data.passWord = newPass;

        await this._mailService.sendMailForgotPass(param.email, newPass) 
        const updated = await this._clientRepository.update(client.id, data)
        const result = new ForgotPassOutput();
        result.setData(updated);
        return result;

    }
}