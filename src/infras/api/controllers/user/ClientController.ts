import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { ActiveClientHandler } from "../../../../core/usecases/user/client/active/ActiveClientHandler";
import { ActiveClientInput } from "../../../../core/usecases/user/client/active/ActiveClientInput";
import { ActiveClientOutput } from "../../../../core/usecases/user/client/active/ActiveClientOutput";
import { CreateClientHandler } from "../../../../core/usecases/user/client/create/CreateClientHandler";
import { CreateClientInput } from "../../../../core/usecases/user/client/create/CreateClientInput";
import { CreateClientOutput } from "../../../../core/usecases/user/client/create/CreateClientOutput";
import { LoginClientHandler } from "../../../../core/usecases/user/client/login/LoginClientHandler";
import { LoginClientInput } from "../../../../core/usecases/user/client/login/LoginClientInput";
import { LoginClientOutput } from "../../../../core/usecases/user/client/login/LoginClientOutput";
import { RequireRegisterHandler } from "../../../../core/usecases/user/client/require-register/RequireRegisterHandler";
import { RequireRegisterInput } from "../../../../core/usecases/user/client/require-register/RequireRegisterInput";
import { RequireRegisterOutput } from "../../../../core/usecases/user/client/require-register/RequireRegisterOutput";





@Service()
@JsonController("/v1/clients")
export class ClientController {
     constructor(
         private readonly _createClientHandler: CreateClientHandler,
         private readonly _loginClientHandler: LoginClientHandler,
         private readonly _requireRegisterHandler: RequireRegisterHandler,
         private readonly _activeClientHandler: ActiveClientHandler
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
}