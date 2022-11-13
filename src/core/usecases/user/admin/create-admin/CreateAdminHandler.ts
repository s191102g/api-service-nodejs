import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Admin } from "../../../../domain/entities/user/Admin";
import { RoleType } from "../../../../domain/enums/userEnum";
import { IAdminRepository } from "../../../../gateways/repositories/user/IAdminRepository";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { CreateAdminInput } from "./CreateAdminInput";
import { CreateAdminOutput } from "./CreateAdminOutput";



@Service()
export class CreateAdminHandler extends CommandHandler<
CreateAdminInput,
CreateAdminOutput
>{
    constructor(
        @Inject('admin.repository')
        private readonly _adminRepository: IAdminRepository
    ){
        super()
    }

    async handle(param: CreateAdminInput): Promise<CreateAdminOutput> {
        await validateDataInput(param);

        const data= new Admin();
        data.userName = param.username;
        data.passWord = param.password;
        data.role = RoleType.Admin;
        data.firstName = "admin"
        const id = await this._adminRepository.create(data);
        const result = new CreateAdminOutput()
        result.setData(id);
        return result;
    }

}