import { Authorized, Body, Get, JsonController, Post, QueryParams } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { CreateAdminHandler } from "../../../../core/usecases/user/admin/create-admin/CreateAdminHandler";
import { CreateAdminInput } from "../../../../core/usecases/user/admin/create-admin/CreateAdminInput";
import { CreateAdminOutput } from "../../../../core/usecases/user/admin/create-admin/CreateAdminOutput";
import { FindAllClientHandler } from "../../../../core/usecases/user/admin/find-all-client/FindAllClientHandler";
import { FindAllClientInput } from "../../../../core/usecases/user/admin/find-all-client/FindAllClientInput";
import { FindAllCientOutput } from "../../../../core/usecases/user/admin/find-all-client/FindAllClientOutput";
import { LoginAdminHandler } from "../../../../core/usecases/user/admin/login-admin/LoginAdminHandler";
import { LoginAdminInput } from "../../../../core/usecases/user/admin/login-admin/LoginAdminInput";
import { LoginAdminOutput } from "../../../../core/usecases/user/admin/login-admin/LoginAdminOutput";


@Service()
@JsonController("/v1/admins")
export class AdminController {
     constructor(
         private readonly _createAdminHandler: CreateAdminHandler,
         private readonly _loginAdminHandler: LoginAdminHandler,
         private readonly _findAllClientHandler: FindAllClientHandler
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

     @Post("/login")
     @OpenAPI({summary:"login admin"})
     @ResponseSchema(LoginAdminOutput)
     async login(
          @Body() param: LoginAdminInput
     ):Promise<LoginAdminOutput>{
        return await this._loginAdminHandler.handle(param)
     }

     @Get("/find-all-clients")
     @Authorized(RoleType.Admin)
     @OpenAPI({summary:"find all client"})
     @ResponseSchema(FindAllCientOutput)
     async findAndCount(
         @QueryParams() param: FindAllClientInput
     ): Promise<FindAllCientOutput>{
         return await this._findAllClientHandler.handle(param)
     }

}