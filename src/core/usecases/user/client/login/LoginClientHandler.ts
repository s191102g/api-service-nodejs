
import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { RoleType, StatusType } from "../../../../domain/enums/userEnum";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { IAuthJwtService } from "../../../../gateways/services/IAuthJwtService";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { LoginClientInput } from "./LoginClientInput";
import { LoginClientOutput } from "./LoginClientOutput";





@Service()
export class LoginClientHandler extends CommandHandler<
 LoginClientInput,
 LoginClientOutput
>{
    constructor(
        @Inject('client.repository')
        private readonly  _clientRepository: IClientRepository,
        @Inject("auth_jwt.service")
        private readonly _authJwtService: IAuthJwtService,
        @Inject("crypto.service")
        private readonly _cryptoService: ICryptoService
    ){
         super()
    }

    async handle(param:  LoginClientInput ): Promise<LoginClientOutput> {
        await validateDataInput(param)
        
        const user = await this._clientRepository.getByEmail(this._cryptoService.encrypt(param.email))
        if (user == null) {
            throw new SystemError(MessageError.PARAM_INCORRECT,"username")
        }

        if (!user.comparePassword(param.password)) {
            throw new SystemError(MessageError.PARAM_INCORRECT,"password")
        }

        
        if(user.status === StatusType.InActive){
            throw new SystemError(MessageError.PARAM_NOT_ACTIVATED,"account")
        }
        if(user.status === StatusType.Archived){
            throw new SystemError(MessageError.PARAM_IS_BANED,"account")
        }
        if(user.role !== RoleType.Client){
            throw new SystemError(MessageError.DATA_INVALID,"account")
        }

        const token = this._authJwtService.sign(
            user.id,
            user.role
          );
          const result = new LoginClientOutput();
          result.setData(token);
          return result;
        
    }
}