import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { CreateWorkspaceInput } from "./CreateWorkspaceInput";
import { CreateWorkspaceOutput } from "./CreateWorkspaceOutput";



@Service()
export class CreateWorkspaceHandler extends CommandHandler<
CreateWorkspaceInput,
CreateWorkspaceOutput
>{
     constructor(
        @Inject("workspace.repository")
        private readonly _workspaceRepository: IWorkSpaceRepository
     ){
        super()
     }

     async handle(userId:string, param:CreateWorkspaceInput): Promise<CreateWorkspaceOutput> {
         await validateDataInput(param)

         const data = new WorkSpace();
         data.userId  = userId;
         data.name = param.name
         data.image = "";
         
         const isExist = await this._workspaceRepository.checkNameExist(param.name)
         if (isExist) {
            throw new SystemError(MessageError.PARAM_EXISTED,"name")
         }

         const member = [userId]
        
         if(param.member){
            param.member.forEach((e)=>{
               member.push(e)
            })
         }
         data.member = member

         const created = await this._workspaceRepository.create(data)
         const result = new CreateWorkspaceOutput()
         result.setData(created)
         return result
     }
}