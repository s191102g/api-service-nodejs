import { IsArray, IsUUID } from "class-validator";
import { Task } from "../../../domain/entities/task/Task";

export class UpdateTaskOfDataInput{
    @IsArray()
    tasks: Task[];

    @IsUUID()
    dataId: string;
    
}