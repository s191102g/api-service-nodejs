import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Task } from "../../../domain/entities/task/Task";
import { IDataRepository } from "../../../gateways/repositories/datas/IDataRepository";
import { ITaskRepository } from "../../../gateways/repositories/task/ITaskRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { UpdateTaskOfDataInput } from "./UpdateTaskOfDataInput";
import { UpdateTaskOfDataOutput } from "./UpdateTaskOfDataOutput";




@Service()
export class UpdateTaskOfDataHandler extends CommandHandler<
UpdateTaskOfDataInput,
UpdateTaskOfDataOutput
>{
    constructor(
        @Inject("data.repository")
        private readonly _dataRepository: IDataRepository,

        @Inject("task.repository")
        private readonly _taskRepository: ITaskRepository
    ){
        super()
    }

    async handle( param:  UpdateTaskOfDataInput): Promise<UpdateTaskOfDataOutput> {
        await validateDataInput(param);

        const datas = await this._dataRepository.getById(param.dataId);
        if(!datas){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

       for (const item of param.tasks) {
        const data = new Task()
        data.title = item.title;
        data.content = item.content;
        data.position = item.position;      
        data.dataId = datas.id;
        await this._taskRepository.update(item.id, data);
       }
        const result = new UpdateTaskOfDataOutput()
        result.setData(true)
        return result
    }
}