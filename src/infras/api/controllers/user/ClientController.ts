import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { CreateClientHandler } from "../../../../core/usecases/user/client/create/CreateClientHandler";
import { CreateClientInput } from "../../../../core/usecases/user/client/create/CreateClientInput";
import { CreateClientOutput } from "../../../../core/usecases/user/client/create/CreateClientOutput";
import { LoginClientHandler } from "../../../../core/usecases/user/client/login/LoginClientHandler";
import { LoginClientInput } from "../../../../core/usecases/user/client/login/LoginClientInput";
import { LoginClientOutput } from "../../../../core/usecases/user/client/login/LoginClientOutput";





@Service()
@JsonController("/v1/clients")
export class ClientController {
     constructor(
         private readonly _createClientHandler: CreateClientHandler,
         private readonly _loginClientHandler: LoginClientHandler
     ){}

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