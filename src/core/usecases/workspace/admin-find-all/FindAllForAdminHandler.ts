import { Inject, Service } from "typedi";
import { FindAllWorkspaceForAdminClientFilter, IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { QueryHandler } from "../../../shared/usecase/QueryHandler";
import { FindAllWorkSpaceForAdminInput } from "./FindAllForAdminInput";
import { FindAllWorkspaceForAdminOutput } from "./FindAllForAdminOutput";






@Service()
export class FindWorkspaceForAdminHandler extends QueryHandler<
FindAllWorkSpaceForAdminInput,
FindAllWorkspaceForAdminOutput
>{
    constructor(
        @Inject("workspace.repository")
        private readonly _workspaceRepository: IWorkSpaceRepository,
    ){super()}

    async handle(param:  FindAllWorkSpaceForAdminInput ): Promise<FindAllWorkspaceForAdminOutput> {
        const filter = new FindAllWorkspaceForAdminClientFilter();
        filter.setPagination(param.skip, param.limit);
        filter.keyword = param.keyword;
    
        const [workspaces, count] = await this._workspaceRepository.findAndCount(
          filter
        );
        const result = new FindAllWorkspaceForAdminOutput();
        result.setData(workspaces);
        result.setPagination(count, param.skip, param.limit);
        return result;
    }
}