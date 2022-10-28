import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
// import { IStorageService } from "../../../gateways/services/IStorageService";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { AddimgWorkspaceInput } from "./AddimgWorkspaceInput";
import { AddimgWorkspaceOutput } from "./AddimgWorkspaceOutput";
import * as fs from "fs";
import mime from "mime";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { MessageError } from "../../../shared/exceptions/message/MessageError";

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
    await validateDataInput(param);

    const file = param.file;
    const ext = mime.getExtension(file.mimetype);
    if (!ext) {
      throw new SystemError(MessageError.PARAM_INVALID, "image");
    }

    WorkSpace.validateImageFile(file);
    const fileKey = WorkSpace.getImagePath(id, ext);
    const data = new WorkSpace();
    //  await this._storageService.uploadFile(param.file, fileKey);
    fs.unlink(`uploads/${fileKey}`, (err) => {
      if (err) console.log(err);
    });
    //  const readStream = await this._storageService.getFile(fileKey)

    data.image = fileKey;

    const hasSucess = await this._workspaceRepository.update(id, data);
    const result = new AddimgWorkspaceOutput();
    result.setData(hasSucess);
    return result;
  }
}
