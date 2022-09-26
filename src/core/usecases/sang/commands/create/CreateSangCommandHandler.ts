
import { Service } from "typedi";
import { Container } from "typeorm-typedi-extensions";
import { SangRepository } from "../../../../../infras/data/repositories/sang/SangRepository";
import { validateDataInput } from "../../../../../utils/validator";
import { Sang } from "../../../../domain/entities/sang/Sang";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { CreateSangCommandInput } from "./CreateSangCommandInput";
import { CreateSangCommandOutput } from "./CreateSangCommandOutput";


@Service()
export class CreateSangCommandHandle extends CommandHandler<
  CreateSangCommandInput,
  CreateSangCommandOutput
> {

  private readonly _sangRepository = Container.get(SangRepository) 
  constructor(
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
    const result = new CreateSangCommandOutput();
    result.setData(id);
    return result;
  }
}
