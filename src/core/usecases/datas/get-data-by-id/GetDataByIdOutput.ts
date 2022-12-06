import { IsArray, IsDate, IsObject, IsString, IsUUID } from "class-validator";
import { Data } from "../../../domain/entities/datas/Data";
import { RefSchemaArray, RefSchemaObject } from "../../../shared/decorators/RefSchema";
import { DataResponse } from "../../../shared/usecase/DataResponse";
import { CreateTaskData } from "../../task/create-task/CreateTaskOutput";

export class GetDataByIdData{
    @IsUUID()
    id: string;

    @IsDate()
    createdAt: Date;

    @IsString()
    title:string | null;

    @IsString()
    content:string | null;

    @IsString()
    heading:string | null;

    @IsUUID()
    boardId:string;

    @IsArray()
   @RefSchemaArray(CreateTaskData)
  task: CreateTaskData[] | null;

    constructor(data: Data){
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.title = data.title;
        this.content = data.content;
        this.heading = data.heading
       this.task = data.tasks && data.tasks.map((e) => new CreateTaskData(e))
    }
}


export class GetDataByIdOutput extends DataResponse<GetDataByIdData>{
    @IsObject()
    @RefSchemaObject(GetDataByIdData)
    data: GetDataByIdData;


    setData(val: Data){
        this.data= new GetDataByIdData(val)
    }
}