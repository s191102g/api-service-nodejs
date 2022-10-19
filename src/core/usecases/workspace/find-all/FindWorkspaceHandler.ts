import { Inject, Service } from "typedi";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { QueryHandler } from "../../../shared/usecase/QueryHandler";
import { FindWorkspaceOutput } from "./FindWorkspaceOutput";




@Service()
export class FindWorkSpacehandler extends QueryHandler<
  null,
  FindWorkspaceOutput
>{
     constructor(
        @Inject("workspace.repository")
        private readonly _workspaceRepository: IWorkSpaceRepository
     ){
        super()
     }

     async handle(userId:string): Promise<FindWorkspaceOutput> {
         const data = await this._workspaceRepository.findByUser(userId)
         const result = new FindWorkspaceOutput()
         result.setData(data)
         return result
     }
}