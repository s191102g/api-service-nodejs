import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Admin } from "../../../../domain/entities/user/Admin";
import { IAdminRepository } from "../../../../gateways/repositories/user/IAdminRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { UpdateClientProfileInput } from "../../client/update-client-profile/UpdateClienProfiletInput";
import { UpdateClientProfileOutput } from "../../client/update-client-profile/UpdateClientProfileOutput";



@Service()
export class UpdateAdminProfileHandler extends CommandHandler<
UpdateClientProfileInput,
UpdateClientProfileOutput
>{
    constructor(
        @Inject('admin.repository')
        private readonly _adminRepository: IAdminRepository,
    
    ){
        super()
    }

    async handle(userId:string, param:  UpdateClientProfileInput): Promise<UpdateClientProfileOutput> {
        await validateDataInput(param);
       
        const admin = await this._adminRepository.getById(userId);
        if(!admin){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const data = new Admin()
        if(param.email)
        data.userName = param.email;
        if(param.avatar)
        data.avatar = param.avatar;
        if(param.birthDay)
        data.birthDay = param.birthDay ;
        if(param.firstName)
        data.firstName = param.firstName;
        if(param.gender)
        data.gender = param.gender;

        const success = await this._adminRepository.update(admin.id, data)
        const result = new UpdateClientProfileOutput()
        result.setData(success)
        return result;

    }
}