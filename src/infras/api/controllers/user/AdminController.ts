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
import { BanClientHandler } from "../../../../core/usecases/user/client/ban-client-for-admin/BanClientHandler";
import { BanClienInput } from "../../../../core/usecases/user/client/ban-client-for-admin/BanClientInput";
import { BanClientOutput } from "../../../../core/usecases/user/client/ban-client-for-admin/BanClientOutput";
import { UnbanClientHandler } from "../../../../core/usecases/user/client/unban-client-for-admin/UnbanClientHandler";
import { UnbanClienInput } from "../../../../core/usecases/user/client/unban-client-for-admin/UnbanClientInput";
import { UnbanClientOutput } from "../../../../core/usecases/user/client/unban-client-for-admin/UnbanClientOutput";
import { FindWorkspaceForAdminHandler } from "../../../../core/usecases/workspace/admin-find-all/FindAllForAdminHandler";
import { FindAllWorkSpaceForAdminInput } from "../../../../core/usecases/workspace/admin-find-all/FindAllForAdminInput";
import { FindAllWorkspaceForAdminOutput } from "../../../../core/usecases/workspace/admin-find-all/FindAllForAdminOutput";


@Service()
@JsonController("/v1/admins")
export class AdminController {
     constructor(
         private readonly _createAdminHandler: CreateAdminHandler,
         private readonly _loginAdminHandler: LoginAdminHandler,
         private readonly _findAllClientHandler: FindAllClientHandler,
         private readonly _findAllWorkspaceForAdminHandler: FindWorkspaceForAdminHandler,
         private readonly _banclientHandler: BanClientHandler,
         private readonly _unbanclientHandler: UnbanClientHandler
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
     async findAndCountClient(
         @QueryParams() param: FindAllClientInput
     ): Promise<FindAllCientOutput>{
         return await this._findAllClientHandler.handle(param)
     }

     @Post("/ban-client")
     @Authorized(RoleType.Admin)
     @OpenAPI({summary:"ban client"})
     @ResponseSchema(BanClientOutput)
     async banClient(
         @Body() param: BanClienInput
     ): Promise<BanClientOutput>{
         return await this._banclientHandler.handle(param)
     }

     @Post("/unban-client")
     @Authorized(RoleType.Admin)
     @OpenAPI({summary:"unban client"})
     @ResponseSchema(UnbanClientOutput)
     async unbanClient(
         @Body() param: UnbanClienInput
     ): Promise<UnbanClientOutput>{
         return await this._unbanclientHandler.handle(param)
     }


     @Get("/find-all-workspace")
     @Authorized(RoleType.Admin)
     @OpenAPI({summary:"find all workspace"})
     @ResponseSchema(FindAllWorkspaceForAdminOutput)
     async findAndCountWorkspace(
         @QueryParams() param: FindAllWorkSpaceForAdminInput
     ): Promise<FindAllWorkspaceForAdminOutput>{
         return await this._findAllWorkspaceForAdminHandler.handle(param)
     }

}