import { Body, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { CreateClientHandler } from "../../../../core/usecases/user/client/create/CreateClientHandler";
import { CreateClientInput } from "../../../../core/usecases/user/client/create/CreateClientInput";
import { CreateClientOutput } from "../../../../core/usecases/user/client/create/CreateClientOutput";





@Service()
@JsonController("/v1/clients")
export class ClientController {
     constructor(
         private readonly _createClientHandler: CreateClientHandler
     ){}

     @Post("/register")
     @OpenAPI({summary:"register client"})
     @ResponseSchema(CreateClientOutput)
     async register(
          @Body() param:CreateClientInput
     ):Promise<CreateClientOutput>{
        return await this._createClientHandler.handle(param)
     }
}