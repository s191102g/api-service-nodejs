import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { UpdateWorkspaceInput } from "./UpdateWorkspaceInput";
import { UpdateWorkspaceOutput } from "./UpdateWorkspaceOutput";




@Service()
export class UpdateWorkspaceHandler extends CommandHandler<
UpdateWorkspaceInput,
UpdateWorkspaceOutput
>{
     constructor(
        @Inject("workspace.repository")
        private readonly _workspaceRepository: IWorkSpaceRepository
     ){
        super()
     }

     async handle(id:string, param:UpdateWorkspaceInput): Promise<UpdateWorkspaceOutput> {
         await validateDataInput(param)

         const wp = await this._workspaceRepository.getById(id)
         if(!wp){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
         }
         const data = new WorkSpace();
         data.name = param.name
         data.image = param.image
         

         const created = await this._workspaceRepository.update(id,data)
         const result = new UpdateWorkspaceOutput()
         result.setData(created)
         return result
     }
}