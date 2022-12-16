import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { Task } from "../../../domain/entities/task/Task";
import { ITaskRepository } from "../../../gateways/repositories/task/ITaskRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { MakeDealineInput } from "./MakeDealineInput";
import { MakeDealineOutput } from "./MakeDealineOutput";
import {SendDealineHandler} from './SendDealineHandler'


@Service()
export class MakeDealineHandler extends CommandHandler<
MakeDealineInput,
MakeDealineOutput
>{
    constructor(    
        @Inject("task.repository")
        private readonly _taskRepository: ITaskRepository
    ){
        super()
    }

    async handle(userid:string, param: MakeDealineInput ): Promise<MakeDealineOutput> {
       await validateDataInput(param)

       const task = await this._taskRepository.getById(param.taskId);
       if(!task){
        throw new SystemError(MessageError.DATA_NOT_FOUND)
       }
       const data: any = {...task, dealine: param.dealine , userid}
       SendDealineHandler.handler(data)
       const dataTask = new Task()
       dataTask.deadline = param.dealine;
       const isUpdated = await this._taskRepository.update(task.id,dataTask)
       const result = new MakeDealineOutput();
        result.setData(isUpdated)
        return result;
    }
}
