import { Authorized, Body, CurrentUser, Get, JsonController, Put } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { MessageError } from "../../../../core/shared/exceptions/message/MessageError";
import { SystemError } from "../../../../core/shared/exceptions/SystemError";
import { UserAuthenticated } from "../../../../core/shared/UserAuthenticated";
import { GetAdminProfileHandler } from "../../../../core/usecases/user/admin/get-admin-profile/GetAdminProfileHandler";
import { GetAdminProfileOutput } from "../../../../core/usecases/user/admin/get-admin-profile/GetAdminProfileOutput";
import { UpdateAdminProfileHandler } from "../../../../core/usecases/user/admin/update-admin-profile/UpdateAdminProfileHandler";
import { UpdatePassAdminHandler } from "../../../../core/usecases/user/admin/update-pass-admin/UpdatePassAdminHandler";
import { GetClientProfileHandler } from "../../../../core/usecases/user/client/get-client-profile/GetClientProfileHandler";
import { GetClientProfileOutput } from "../../../../core/usecases/user/client/get-client-profile/GetClientProfileOutput";
import { UpdateClientProfileInput } from "../../../../core/usecases/user/client/update-client-profile/UpdateClienProfiletInput";
import { UpdateClientProfileHandler } from "../../../../core/usecases/user/client/update-client-profile/UpdateClientProfileHandler";
import { UpdateClientProfileOutput } from "../../../../core/usecases/user/client/update-client-profile/UpdateClientProfileOutput";
import { UpdatePassClientHandler } from "../../../../core/usecases/user/client/update-pass-client/UpdatePassClientHandler";
import { UpdatePassClientInput } from "../../../../core/usecases/user/client/update-pass-client/UpdatePassClientInput";
import { UpdatePassClientOutput } from "../../../../core/usecases/user/client/update-pass-client/UpdatePassClientOutput";




@Service()
@JsonController("/v1/users")
export class UserController {
     constructor(
        private readonly _getClientprofileHandler: GetClientProfileHandler,
        private readonly _getAdminprofileHandler: GetAdminProfileHandler,
        private readonly _updateClientProfileHandler: UpdateClientProfileHandler,
        private readonly _updateAdminProfileHandler: UpdateAdminProfileHandler,
        private readonly _updatePassClientHandler:  UpdatePassClientHandler,
        private readonly _updatePassAdminHandler: UpdatePassAdminHandler

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


     @Put("/update-profile")
     @Authorized()
     @OpenAPI({
       description: "Update my profile information. Applies to any user.",
     })
     @ResponseSchema(UpdateClientProfileOutput)
     async updateProfile(
       @CurrentUser() userAuth: UserAuthenticated,
       @Body() param: UpdateClientProfileInput
     ): Promise<UpdateClientProfileOutput> {
       switch (userAuth.role) {
     
         case RoleType.Admin:
           return await this._updateAdminProfileHandler.handle(
             userAuth.userId,
             param
           );
   
         case RoleType.Client:
           return await this._updateClientProfileHandler.handle(
             userAuth.userId,
             param
           );
   
         default:
           throw new SystemError(MessageError.DATA_INVALID);
       }
     }
   

     @Put("/update-password")
     @Authorized()
     @OpenAPI({
       description: "Update my password. Applies to any user.",
     })
     @ResponseSchema(UpdatePassClientOutput)
     async updatePass(
       @CurrentUser() userAuth: UserAuthenticated,
       @Body() param: UpdatePassClientInput,
       
     ): Promise<UpdatePassClientOutput> {
       switch (userAuth.role) {
     
         case RoleType.Admin:
           return await this._updatePassAdminHandler.handle(
             userAuth.userId,
             param
           );
   
         case RoleType.Client:
           return await this._updatePassClientHandler.handle(
             userAuth.userId,
             param
           );
   
         default:
           throw new SystemError(MessageError.DATA_INVALID);
       }
     }
   

}