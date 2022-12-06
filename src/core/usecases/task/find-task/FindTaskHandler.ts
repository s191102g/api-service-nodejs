import { Inject, Service } from "typedi";
import { FindTaskFilter, ITaskRepository } from "../../../gateways/repositories/task/ITaskRepository";
import { QueryHandler } from "../../../shared/usecase/QueryHandler";
import { FindTaskInput } from "./FindTaskInput";
import { FindTaskOutput } from "./FindTaskOutput";






@Service()
export class FindTaskHandler extends QueryHandler<
FindTaskInput,
FindTaskOutput
>{
    constructor(
        @Inject("task.repository")
        private readonly _taskRepository: ITaskRepository,
    ){super()}

    async handle(param:  FindTaskInput ): Promise<FindTaskOutput> {
        const filter = new FindTaskFilter();
        filter.setPagination(param.skip, param.limit);
        filter.keyword = param.keyword;
        filter.dataId = param.dataId;
        const [tasks, count] = await this._taskRepository.findAndCount(
          filter
        );
        const result = new FindTaskOutput();
        result.setData(tasks);
        result.setPagination(count, param.skip, param.limit);
        return result;
    }
}