import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { ActiveClientHandler } from "../../../../core/usecases/user/client/active/ActiveClientHandler";
import { ActiveClientInput } from "../../../../core/usecases/user/client/active/ActiveClientInput";
import { ActiveClientOutput } from "../../../../core/usecases/user/client/active/ActiveClientOutput";
import { CreateClientHandler } from "../../../../core/usecases/user/client/create/CreateClientHandler";
import { CreateClientInput } from "../../../../core/usecases/user/client/create/CreateClientInput";
import { CreateClientOutput } from "../../../../core/usecases/user/client/create/CreateClientOutput";
import { ForgotPassHandler } from "../../../../core/usecases/user/client/forgot-pass/ForgotPassHandler";
import { ForgotPassInput } from "../../../../core/usecases/user/client/forgot-pass/ForgotPassInput";
import { ForgotPassOutput } from "../../../../core/usecases/user/client/forgot-pass/ForgotPassOutput";
import { LoginClientHandler } from "../../../../core/usecases/user/client/login/LoginClientHandler";
import { LoginClientInput } from "../../../../core/usecases/user/client/login/LoginClientInput";
import { LoginClientOutput } from "../../../../core/usecases/user/client/login/LoginClientOutput";
import { RequireRegisterHandler } from "../../../../core/usecases/user/client/require-register/RequireRegisterHandler";
import { RequireRegisterInput } from "../../../../core/usecases/user/client/require-register/RequireRegisterInput";
import { RequireRegisterOutput } from "../../../../core/usecases/user/client/require-register/RequireRegisterOutput";
import { ResendActiveHandler } from "../../../../core/usecases/user/client/resend-active/ResendActiveHandler";
import { ResendActiveInput } from "../../../../core/usecases/user/client/resend-active/ResendActiveInput";
import { ResendActiveOutput } from "../../../../core/usecases/user/client/resend-active/ResendactiveOutput";
import { UsingWithGGHandler } from "../../../../core/usecases/user/client/using-with-gg/UsingWithGGHandler";
import { UsingWithGGInput } from "../../../../core/usecases/user/client/using-with-gg/UsingWithGGInput";
import { UsingWithGGOutput } from "../../../../core/usecases/user/client/using-with-gg/UsingWithGGOutput";





@Service()
@JsonController("/v1/clients")
export class ClientController {
     constructor(
         private readonly _createClientHandler: CreateClientHandler,
         private readonly _loginClientHandler: LoginClientHandler,
         private readonly _requireRegisterHandler: RequireRegisterHandler,
         private readonly _activeClientHandler: ActiveClientHandler,
         private readonly _usingWithGGHandler: UsingWithGGHandler,
         private readonly _resendActiveHandler: ResendActiveHandler,
         private readonly _forgotPassHandler: ForgotPassHandler
     ){}

     @Post("/require-register")
     @OpenAPI({summary:"require register client"})
     @ResponseSchema(RequireRegisterOutput)
     async requireRegister(
          @Body() param:RequireRegisterInput
     ):Promise<RequireRegisterOutput>{
        return await this._requireRegisterHandler.handle(param)
     }

     @Post('/active')
     @OpenAPI({summary:"active"})
     @ResponseSchema(ActiveClientOutput)
     async active(
          @Body() param: ActiveClientInput
     ): Promise<ActiveClientOutput>{
          return await this._activeClientHandler.handle(param)
     }

     @Post('/resend-activekey')
     @OpenAPI({summary:"resend active"})
     @ResponseSchema(ResendActiveOutput)
     async resendactive(
          @Body() param: ResendActiveInput
     ): Promise<ResendActiveOutput>{
          return await this._resendActiveHandler.handle(param)
     }

     @Post("/register")
     @OpenAPI({summary:"register client"})
     @ResponseSchema(CreateClientOutput)
     async register(
          @Body() param:CreateClientInput
     ):Promise<CreateClientOutput>{
        return await this._createClientHandler.handle(param)
     }

     @Post("/login")
     @OpenAPI({summary:"Login"})
     @ResponseSchema(LoginClientOutput)
     async login(
          @Body() param:LoginClientInput
     ):Promise<LoginClientOutput>{
          return await this._loginClientHandler.handle(param)
     }

     
     @Post("/using-with-gg")
     @OpenAPI({summary:"Using with google"})
     @ResponseSchema(UsingWithGGOutput)
     async usingWithGG(
          @Body() param:UsingWithGGInput
     ):Promise<UsingWithGGOutput>{
          return await this._usingWithGGHandler.handle(param)
     }
     
     @Post('/forgot-pass')
     @OpenAPI({summary:"forgot pass"})
     @ResponseSchema(ForgotPassOutput)
     async forgotPass(
          @Body() param: ForgotPassInput,
          
     ): Promise<ForgotPassOutput>{
          return await this._forgotPassHandler.handle(param)
     }
}