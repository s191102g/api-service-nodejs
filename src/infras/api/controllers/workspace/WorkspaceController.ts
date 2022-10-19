import { Authorized, Body, CurrentUser, Get, JsonController, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { UserAuthenticated } from "../../../../core/shared/UserAuthenticated";
import { CreateClientOutput } from "../../../../core/usecases/user/client/create/CreateClientOutput";
import { CreateWorkspaceHandler } from "../../../../core/usecases/workspace/create/CreateWorkspaceHandler";
import { CreateWorkspaceInput } from "../../../../core/usecases/workspace/create/CreateWorkspaceInput";
import { FindWorkSpacehandler } from "../../../../core/usecases/workspace/find-all/FindWorkspaceHandler";
import { FindWorkspaceOutput } from "../../../../core/usecases/workspace/find-all/FindWorkspaceOutput";





@Service()
@JsonController('/v1/workspace')
export class WorkspaceController {
    
    constructor(
         private readonly _createWorkspaceHandler: CreateWorkspaceHandler,
         private readonly _findWorkspaceHandler: FindWorkSpacehandler
    ){}

    @Post('/')
    @Authorized()
    @OpenAPI({summary:"Add new workspace"})
    @ResponseSchema(CreateClientOutput)
    async addNew(
        @Body() param:CreateWorkspaceInput,
        @CurrentUser()  userAuth: UserAuthenticated
    ): Promise<CreateClientOutput>{
        return await this._createWorkspaceHandler.handle(userAuth.userId, param)
    }

    @Get('/')
    @Authorized()
    @OpenAPI({summary:"Get all workspace by user"})
    @ResponseSchema(FindWorkspaceOutput)
    async getByUser(
        @CurrentUser()  userAuth: UserAuthenticated
    ): Promise<FindWorkspaceOutput>{
        return await this._findWorkspaceHandler.handle(userAuth.userId)
    }
}