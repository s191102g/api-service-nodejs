import { Inject, Service } from "typedi";
import { IAdminRepository } from "../../../../gateways/repositories/user/IAdminRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { GetAdminProfileOutput } from "./GetAdminProfileOutput";



@Service()
export class GetAdminProfileHandler extends CommandHandler<
string,
GetAdminProfileOutput
>{
    constructor(
        @Inject('admin.repository')
        private readonly _adminRepository: IAdminRepository
    
    ){
        super()
    }

    async handle(param: string ): Promise<GetAdminProfileOutput> {
        const admin = await this._adminRepository.getById(param);
        if(!admin){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const result = new GetAdminProfileOutput()
        result.setData(admin);
        return result;
    }


}