import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Admin } from "../../../../domain/entities/user/Admin";
import { IAdminRepository } from "../../../../gateways/repositories/user/IAdminRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { UpdatePassClientInput } from "../../client/update-pass-client/UpdatePassClientInput";
import { UpdatePassClientOutput } from "../../client/update-pass-client/UpdatePassClientOutput";


@Service()
export class UpdatePassAdminHandler extends CommandHandler<
UpdatePassClientInput,
UpdatePassClientOutput
>{
    constructor(
        @Inject('admin.repository')
        private readonly _adminRepository: IAdminRepository,
    ){
        super()
    }

    async handle(userId: string , param: UpdatePassClientInput ): Promise<UpdatePassClientOutput> {
        await validateDataInput(param)
        const client = await this._adminRepository.getById(userId);
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
        if (!client.comparePassword(param.oldPass)) {
            throw new SystemError(MessageError.PARAM_INCORRECT,"password")
        }

        const data = new Admin()
        data.passWord = param.newPass;

        const success = await this._adminRepository.update(client.id, data)
        const result = new UpdatePassClientOutput()
        result.setData(success)
        return result;
    }
}