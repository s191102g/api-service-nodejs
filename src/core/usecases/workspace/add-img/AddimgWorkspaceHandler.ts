import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { AddimgWorkspaceInput } from "./AddimgWorkspaceInput";
import { AddimgWorkspaceOutput } from "./AddimgWorkspaceOutput";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { MessageError } from "../../../shared/exceptions/message/MessageError";

@Service()
export class AddimgWorkspaceHandler extends CommandHandler<
  AddimgWorkspaceInput,
  AddimgWorkspaceOutput
> {
  constructor(

    @Inject("workspace.repository")
    private readonly _workspaceRepository: IWorkSpaceRepository
  ) {
    super();
  }

  async handle(
    id: string,
    param: AddimgWorkspaceInput
  ): Promise<AddimgWorkspaceOutput> {
    await validateDataInput(param);

    const data = new WorkSpace()
    data.image = param.image;
    
    const wp = await this._workspaceRepository.getById(id)
    if(!wp){
      throw new SystemError(MessageError.DATA_NOT_FOUND)
    }

     await this._workspaceRepository.update(id, data);
    const result = new AddimgWorkspaceOutput();
    result.setData('test');
    return result;
  }
}
