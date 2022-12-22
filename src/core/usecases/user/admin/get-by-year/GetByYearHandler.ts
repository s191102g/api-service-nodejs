import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { ITaskRepository } from "../../../../gateways/repositories/task/ITaskRepository";
import { ITemplateRepository } from "../../../../gateways/repositories/template/ITemplateRepository";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { IWorkSpaceRepository } from "../../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { GetByYearInput } from "./GetByYearInput";
import { GetByYearOutput } from "./GetByYearOutput";


@Service()
export class GetByYearHadler extends CommandHandler<
GetByYearInput,
GetByYearOutput
>{
    constructor(
        @Inject("workspace.repository")
        private readonly _workspaceRepository: IWorkSpaceRepository,
        @Inject('client.repository')
        private readonly  _clientRepository: IClientRepository,
        @Inject("task.repository")
        private readonly _taskRepository: ITaskRepository,

        @Inject("template.repository")
        private readonly _templateRepository: ITemplateRepository
    ){
        super()
    }
    async handle(param: GetByYearInput): Promise<GetByYearOutput> {
        await validateDataInput(param);
 
        const workSpace = await this._workspaceRepository.getByYear(param.Start,param.End)
        const Client = await this._clientRepository.getByYear(param.Start,param.End)
        const Task = await this._taskRepository.getByYear(param.Start,param.End)
        const Template = await this._templateRepository.getByYear(param.Start,param.End)
        
        const resutl = new GetByYearOutput()
        resutl.setData({workSpace,Client,Task,Template})
        return resutl
    }
}