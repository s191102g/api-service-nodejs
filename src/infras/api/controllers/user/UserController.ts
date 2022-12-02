import { Authorized, CurrentUser, Get, JsonController } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { MessageError } from "../../../../core/shared/exceptions/message/MessageError";
import { SystemError } from "../../../../core/shared/exceptions/SystemError";
import { UserAuthenticated } from "../../../../core/shared/UserAuthenticated";
import { GetAdminProfileHandler } from "../../../../core/usecases/user/admin/get-admin-profile/GetAdminProfileHandler";
import { GetAdminProfileOutput } from "../../../../core/usecases/user/admin/get-admin-profile/GetAdminProfileOutput";
import { GetClientProfileHandler } from "../../../../core/usecases/user/client/get-client-profile/GetClientProfileHandler";
import { GetClientProfileOutput } from "../../../../core/usecases/user/client/get-client-profile/GetClientProfileOutput";




@Service()
@JsonController("/v1/users")
export class UserController {
     constructor(
        private readonly _getClientprofileHandler: GetClientProfileHandler,
        private readonly _getAdminprofileHandler: GetAdminProfileHandler
     ){}



     @Get("/profile")
     @Authorized()
     @OpenAPI({
       description: "Get my profile information. Applies to any user.",
     })
     @ResponseSchema(GetClientProfileOutput)
     @ResponseSchema(GetAdminProfileOutput)
     async getProfile(
       @CurrentUser() userAuth: UserAuthenticated
     ): Promise< GetAdminProfileOutput| GetClientProfileOutput> {
       switch (userAuth.role) {
     
         case RoleType.Admin:
           return await this._getAdminprofileHandler.handle(
             userAuth.userId
           );
   
         case RoleType.Client:
           return await this._getClientprofileHandler.handle(
             userAuth.userId
           );
   
         default:
           throw new SystemError(MessageError.DATA_INVALID);
       }
     }
   

}