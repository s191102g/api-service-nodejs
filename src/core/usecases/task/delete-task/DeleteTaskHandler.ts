
import { Inject, Service } from "typedi";
import { ITaskRepository } from "../../../gateways/repositories/task/ITaskRepository";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { DeleteTaskOutput } from "./DeleteTaskOutput";



@Service()
export class DeleteTaskHandler extends CommandHandler<
string,
DeleteTaskOutput
>{
    constructor(
        @Inject("task.repository")
        private readonly _taskRepository: ITaskRepository
    ){
        super()
    }

    async handle(id: string): Promise<DeleteTaskOutput> {

        const task = await this._taskRepository.getById(id);
        if(!task){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }

        const hasSucess = await this._taskRepository.softDelete(id)

        const result = new DeleteTaskOutput()
        result.setData(hasSucess);
        return result
    }
}