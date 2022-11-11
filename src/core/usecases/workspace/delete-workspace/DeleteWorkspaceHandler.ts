import { Inject, Service } from "typedi";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { DeleteWorkspaceInput } from "./DeleteWorkspaceInput";
import { DeleteWorkspaceOutput } from "./DeleteWorkspaceOutput";




@Service()
export class DeleteWorkspaceHandler extends CommandHandler<
DeleteWorkspaceInput,
DeleteWorkspaceOutput
>{
    constructor(
        @Inject("workspace.repository")
        private readonly _workspaceRepository: IWorkSpaceRepository
    ){
        super()
    }

    async handle(param: DeleteWorkspaceInput ): Promise<DeleteWorkspaceOutput> {
        const workspace = await this._workspaceRepository.getById(param.id);
        if(!workspace){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
        if(workspace.userId != param.userId){
            throw new SystemError(MessageError.DATA_CANNOT_DELETE)
        }

        const success = await this._workspaceRepository.softDelete(param.id);
        const result = new DeleteWorkspaceOutput();
        result.setData(success);
        return result;
    }

}