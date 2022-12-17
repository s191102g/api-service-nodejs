import { IsNumber, IsObject, IsString, IsUUID } from "class-validator";
import { Task } from "../../../domain/entities/task/Task";
import { RefSchemaObject } from "../../../shared/decorators/RefSchema";
import { DataResponse } from "../../../shared/usecase/DataResponse";

export class CreateTaskData{
    @IsUUID()
    id: string;

    @IsUUID()
    dataId: string;

    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsNumber()
    position: number;

    @IsString()
    deadline: string;
    constructor(data: Task){
        this.id = data.id;
        this.dataId = data.dataId;
        this.title = data.title;
        this.content = data.content;
        this.position = data.position;
        this.deadline = data.deadline
    }
}


export class CreateTaskOutput extends DataResponse<CreateTaskData> {
    @IsObject()
    @RefSchemaObject(CreateTaskData)
    data: CreateTaskData;

    setData(val: Task){
        this.data = new CreateTaskData(val);
    }

}