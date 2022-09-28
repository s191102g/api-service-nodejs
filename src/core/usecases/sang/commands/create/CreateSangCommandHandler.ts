
import {   Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Sang } from "../../../../domain/entities/sang/Sang";
import { ISangRepository } from "../../../../gateways/repositories/sang/ISangRepository";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { CreateSangCommandInput } from "./CreateSangCommandInput";
import { CreateSangCommandOutput } from "./CreateSangCommandOutput";


@Service()
export class CreateSangCommandHandle extends CommandHandler<
  CreateSangCommandInput,
  CreateSangCommandOutput
> {
   
 
  constructor(
    @Inject('sang.repository')
    private readonly _sangRepository : ISangRepository 
  ) {
    super();
  }

   async handle(
    param: CreateSangCommandInput
  ): Promise<CreateSangCommandOutput> {

    await validateDataInput(param)
    const data = new Sang();
    data.name = param.name;

    const id = await this._sangRepository.create(data);
    if (!id) {
      throw new SystemError(MessageError.SOMETHING_WRONG)
    }
    const result = new CreateSangCommandOutput();
    result.setData(id);
    return result;
  }
}
