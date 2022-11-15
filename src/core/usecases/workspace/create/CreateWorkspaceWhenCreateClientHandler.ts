import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { HandleOption } from "../../../shared/usecase/HandleOption";
import { CreateWorkspaceInput } from "./CreateWorkspaceInput";
import { CreateWorkspaceOutput } from "./CreateWorkspaceOutput";



@Service()
export class CreateWorkspaceWhenCreateClientHandler extends CommandHandler<
CreateWorkspaceInput,
CreateWorkspaceOutput
>{
     constructor(
        @Inject("workspace.repository")
        private readonly _workspaceRepository: IWorkSpaceRepository
     ){
        super()
     }

     async handle(userId:string, param:CreateWorkspaceInput, handleOption: HandleOption): Promise<CreateWorkspaceOutput> {
         await validateDataInput(param)

         const data = new WorkSpace();
         data.userId  = userId;
         data.name = param.name
         data.image = "";

         const member = [userId]
         data.member = member
         const created = await this._workspaceRepository.create(data, handleOption.queryRunner)
         const result = new CreateWorkspaceOutput()
         result.setData(created)
         return result
     }
}