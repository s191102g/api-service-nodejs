import { IsArray, IsDate, IsString, IsUUID } from "class-validator";
import { Task } from "../../../domain/entities/task/Task";
import { RefSchemaArray } from "../../../shared/decorators/RefSchema";
import { PaginationResponse } from "../../../shared/usecase/PaginationResponse";



export class FindTaskData{
    @IsUUID()
    id: string;

    @IsDate()
    createdAt: Date;

   @IsString()
   title: string;

   @IsString()
   content: string;

   @IsString()
   position: number;

    constructor(data: Task){
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.title = data.title;
        this.content = data.content;
        this.position =data.position;
    }
}


export class FindTaskOutput extends PaginationResponse<FindTaskData>{
    @IsArray()
    @RefSchemaArray(FindTaskData)
    data: FindTaskData[];

    setData(list: Task[]):void{
        this.data = list.map((e)=> new FindTaskData(e));
    }
}