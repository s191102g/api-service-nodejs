import { Inject, Service } from "typedi";
import { ISangRepository } from "../../../../gateways/repositories/sang/ISangRepository";
import { QueryHandler } from "../../../../shared/usecase/QueryHandler";
import { FindSangQueryOutput } from "./FindSangQueryOutput";

@Service()
export class FindSangQueryHandler extends QueryHandler<
  null,
  FindSangQueryOutput
> {

  constructor(
    @Inject('sang.repository')
    private readonly _sangRepository: ISangRepository
  ) {
    super();
  }

  async handle(): Promise<FindSangQueryOutput> {
    let sangarr = await this._sangRepository.find();

    const result = new FindSangQueryOutput();
    result.setData(sangarr);
    return result;
  }
}
