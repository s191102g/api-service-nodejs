import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Task } from "../../../domain/entities/task/Task";
import { IDataRepository } from "../../../gateways/repositories/datas/IDataRepository";
import { ITaskRepository } from "../../../gateways/repositories/task/ITaskRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { CreateTaskInput } from "./CreateTaskInput";
import { CreateTaskOutput } from "./CreateTaskOutput";



@Service()
export class CreateTaskHandler extends CommandHandler<
CreateTaskInput,
CreateTaskOutput
>{
    constructor(
        @Inject("data.repository")
        private readonly _dataRepository: IDataRepository,

        @Inject("task.repository")
        private readonly _taskRepository: ITaskRepository
    ){
        super()
    }

    async handle(param:  CreateTaskInput): Promise<CreateTaskOutput> {
        await validateDataInput(param);

        const datas = await this._dataRepository.getById(param.dataId);
        if(!datas){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const data = new Task()
        data.title = param.title;
        data.content = param.content;
        data.dataId = datas.id;
        data.position = param.position;

        const idCreated = await this._taskRepository.create(data);
        const task = await this._taskRepository.getById(idCreated);

        if(!task){
            throw new SystemError(MessageError.SOMETHING_WRONG)
        }
        const result = new CreateTaskOutput()
        result.setData(task)
        return result
    }
}