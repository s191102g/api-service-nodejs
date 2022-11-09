import { Inject, Service } from "typedi";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
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

         const list = await this._workspaceRepository.getAll()
         const data : WorkSpace[]= [];

         for (const item of list) {
            if(item.member.includes(userId)){
               data.push(item)
            }
         }
         const result = new FindWorkspaceOutput()
         result.setData(data)
         return result;
     }
}