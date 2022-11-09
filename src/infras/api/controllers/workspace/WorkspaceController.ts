import { Authorized, Body, CurrentUser, Get, JsonController, Patch, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
import { UserAuthenticated } from "../../../../core/shared/UserAuthenticated";
import { CreateWorkspaceHandler } from "../../../../core/usecases/workspace/create/CreateWorkspaceHandler";
import { CreateWorkspaceInput } from "../../../../core/usecases/workspace/create/CreateWorkspaceInput";
import { FindWorkSpacehandler } from "../../../../core/usecases/workspace/find-all/FindWorkspaceHandler";
import { FindWorkspaceOutput } from "../../../../core/usecases/workspace/find-all/FindWorkspaceOutput";
// import multer from "multer";
// import { STORAGE_UPLOAD_DIR } from "../../../../configs/Configuration";
// import { AddimgWorkspaceInput } from "../../../../core/usecases/workspace/add-img/AddimgWorkspaceInput";
// import { AddimgWorkspaceOutput } from "../../../../core/usecases/workspace/add-img/AddimgWorkspaceOutput";
// import { AddimgWorkspaceHandler } from "../../../../core/usecases/workspace/add-img/AddimgWorkspaceHandler";
import { CreateWorkspaceOutput } from "../../../../core/usecases/workspace/create/CreateWorkspaceOutput";
import { AddMemberWorkspaceOutput } from "../../../../core/usecases/workspace/add-member/AddMemberWorkspaceOutput";
import { AddMemberWorkspaceInput } from "../../../../core/usecases/workspace/add-member/AddMemberWorkspaceInput";
import { AddMemberWorkspaceHandler } from "../../../../core/usecases/workspace/add-member/AddMemberWorkSpaceHandler";


// const storage = multer.diskStorage({
//     destination(_req, _file, cb) {
//       cb(null, STORAGE_UPLOAD_DIR);
//     },
//     filename(_req, file, cb) {
//       cb(null, `${file.fieldname}-${Date.now()}`);
//     },
//   });
  

@Service()
@JsonController('/v1/workspace')
export class WorkspaceController {
    
    constructor(
          //  private readonly _addimgWorkspaceHandler: AddimgWorkspaceHandler
         private readonly _createWorkspaceHandler: CreateWorkspaceHandler,
         private readonly _findWorkspaceHandler: FindWorkSpacehandler,
        private readonly _addMemberWorkspaceHandler: AddMemberWorkspaceHandler
    ){}

    @Post('/')
    @Authorized()
    @OpenAPI({summary:"Add new workspace"})
    @ResponseSchema(CreateWorkspaceOutput)
    async create(
        @Body() param:CreateWorkspaceInput,
        @CurrentUser()  userAuth: UserAuthenticated
    ): Promise<CreateWorkspaceOutput>{
        return await this._createWorkspaceHandler.handle(userAuth.userId, param)
    }

    @Get('/')
    @Authorized()
    @OpenAPI({summary:"Get all workspace have user"})
    @ResponseSchema(FindWorkspaceOutput)
    async getByUser(
        @CurrentUser()  userAuth: UserAuthenticated
    ): Promise<FindWorkspaceOutput>{
        return await this._findWorkspaceHandler.handle(userAuth.userId)
    }

    @Patch("/add-member")
    @Authorized()
    @OpenAPI({summary:"add member for workspace"})
    @ResponseSchema(AddMemberWorkspaceOutput)
    async addMember(
        @Body() param: AddMemberWorkspaceInput,
        @CurrentUser()  userAuth: UserAuthenticated
    ): Promise<AddMemberWorkspaceOutput>{
        return await this._addMemberWorkspaceHandler.handle(userAuth.userId, param)
    }

    // @Patch("/add-image/:id([0-9a-f-]{36})")
    // @Authorized()
    // @OpenAPI({summary:"add image"})
    // @ResponseSchema(AddimgWorkspaceOutput)
    // async addImg(
    //     @UploadedFile("imageWorkspace", { required: true, options: { storage } })
    //     file: Express.Multer.File,
    //     @Param("id") id: string
    // ): Promise<AddimgWorkspaceOutput>{
    //     const param = new AddimgWorkspaceInput()
    //     param.file = file
    //     return await this._addimgWorkspaceHandler.handle(id,param)
    // }
}