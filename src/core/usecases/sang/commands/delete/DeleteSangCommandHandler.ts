import { Inject, Service } from "typedi";
import { ISangRepository } from "../../../../gateways/repositories/sang/ISangRepository";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { DeleteSangcommandOutput } from "./DeleteSangCommandOutput";

@Service()
export class DeleteSangCommandHandler extends CommandHandler<
  string,
  DeleteSangcommandOutput
> {
  

  constructor(
    @Inject('sang.repository')
    private readonly _sangRepository : ISangRepository 
  ) {
    super();
  }

  async handle(id: string): Promise<DeleteSangcommandOutput> {
    const res = await this._sangRepository.softDelete(id);

    const result = new DeleteSangcommandOutput();
    result.setData(res);

    return result;
  }
}
