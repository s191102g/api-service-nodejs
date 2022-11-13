import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { RoleType } from "../../../../domain/enums/userEnum";
import { IAdminRepository } from "../../../../gateways/repositories/user/IAdminRepository";
import { IAuthJwtService } from "../../../../gateways/services/IAuthJwtService";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { QueryHandler } from "../../../../shared/usecase/QueryHandler";
import { LoginAdminInput } from "./LoginAdminInput";
import { LoginAdminOutput } from "./LoginAdminOutput";


@Service()
export class LoginAdminHandler extends QueryHandler<
LoginAdminInput,
LoginAdminOutput
>{
    constructor(
        @Inject('admin.repository')
        private readonly _adminRepository: IAdminRepository,
        @Inject("auth_jwt.service")
        private readonly _authJwtService: IAuthJwtService,
        @Inject("crypto.service")
        private readonly _cryptoService: ICryptoService
    ){
        super()
    }


    async handle(param:  LoginAdminInput): Promise<LoginAdminOutput> {
        await validateDataInput(param);

        const admin = await this._adminRepository.getByUsername( this._cryptoService.encrypt(param.username) )
        if (!admin) {
            throw new SystemError(MessageError.PARAM_INCORRECT,"username")
        }

        if (!admin.comparePassword(param.password)) {
            throw new SystemError(MessageError.PARAM_INCORRECT,"password")
        }

        if(admin.role !== RoleType.Admin){
            throw new SystemError(MessageError.DATA_INVALID,"account")
        }

        const token = this._authJwtService.sign(
            admin.id,
            admin.role
          );
          const result = new LoginAdminOutput();
          result.setData(token);
          return result;
    }

}