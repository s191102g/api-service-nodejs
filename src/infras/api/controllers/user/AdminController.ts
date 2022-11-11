import { Authorized, Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { RoleType } from "../../../../core/domain/enums/user/userEnum";
import { CreateAdminHandler } from "../../../../core/usecases/user/admin/create-admin/CreateAdminHandler";
import { CreateAdminInput } from "../../../../core/usecases/user/admin/create-admin/CreateAdminInput";
import { CreateAdminOutput } from "../../../../core/usecases/user/admin/create-admin/CreateAdminOutput";


@Service()
@JsonController("/v1/admin")
export class ClientController {
     constructor(
         private readonly _createAdminHandler: CreateAdminHandler
     ){}
     @Post("/create")
     @Authorized(RoleType.Admin)
     @OpenAPI({summary:"register admin"})
     @ResponseSchema(CreateAdminOutput)
     async register(
          @Body() param: CreateAdminInput
     ):Promise<CreateAdminOutput>{
        return await this._createAdminHandler.handle(param)
     }


}