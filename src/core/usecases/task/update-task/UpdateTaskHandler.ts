import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Task } from "../../../domain/entities/task/Task";
import { IDataRepository } from "../../../gateways/repositories/datas/IDataRepository";
import { ITaskRepository } from "../../../gateways/repositories/task/ITaskRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { UpdateTaskInput } from "./UpdateTaskInput";
import { UpdateTaskOutput } from "./UpdateTaskOutput";



@Service()
export class UpdateTaskHandler extends CommandHandler<
UpdateTaskInput,
UpdateTaskOutput
>{
    constructor(
        @Inject("data.repository")
        private readonly _dataRepository: IDataRepository,

        @Inject("task.repository")
        private readonly _taskRepository: ITaskRepository
    ){
        super()
    }

    async handle(id: string, param:  UpdateTaskInput): Promise<UpdateTaskOutput> {
        await validateDataInput(param);

        const datas = await this._dataRepository.getById(param.dataId);
        if(!datas){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
        const task = await this._taskRepository.getById(id);
        if(!task){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const data = new Task()
        if(param.title)
        data.title = param.title;
        if( param.content)
        data.content = param.content;
        if( param.position)
        data.position = param.position;      
        data.dataId = datas.id;
       
        const idUpdated = await this._taskRepository.update(id, data);
        const result = new UpdateTaskOutput()
        result.setData(idUpdated)
        return result
    }
}