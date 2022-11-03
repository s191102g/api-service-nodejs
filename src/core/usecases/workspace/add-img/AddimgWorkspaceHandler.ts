import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { AddimgWorkspaceInput } from "./AddimgWorkspaceInput";
import { AddimgWorkspaceOutput } from "./AddimgWorkspaceOutput";
import mime from "mime-types";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
// import { IStorageService } from "../../../gateways/services/IStorageService";
// import { readFile, removeFile } from "../../../../utils/file";

@Service()
export class AddimgWorkspaceHandler extends CommandHandler<
  AddimgWorkspaceInput,
  AddimgWorkspaceOutput
> {
  constructor(
    // @Inject("storage.service")
    // private readonly _storageService: IStorageService,

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

    const file = param.file;
    const ext = mime.extension(file.mimetype);
    if (!ext) {
      throw new SystemError(MessageError.PARAM_INVALID, "image");
    }

    WorkSpace.validateImageFile(file);
    const imagePath = WorkSpace.getImagePath(id, ext);

    const data = new WorkSpace()
    data.image = imagePath;
    
    // const buffer = await readFile(file.path);
    // const hasSucceed = await this._storageService
    //   .upload( buffer,imagePath, ext)
    //   .finally(() => removeFile(file.path));
    // if (!hasSucceed) {
    //   throw new SystemError(MessageError.PARAM_CANNOT_UPLOAD, "image");
    // }

     await this._workspaceRepository.update(id, data);
    const result = new AddimgWorkspaceOutput();
    result.setData('test');
    return result;
  }
}
