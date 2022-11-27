import { IsArray, IsDate, IsString, IsUUID } from "class-validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { RefSchemaArray } from "../../../shared/decorators/RefSchema";
import { PaginationResponse } from "../../../shared/usecase/PaginationResponse";



export class FindAllWorkSpaceForAdminData{
    @IsUUID()
    id: string;

    @IsDate()
    createdAt: Date;

    @IsString()
    userCreate:string;

    @IsString()
    image:string;

    @IsString()
    name:string;

    @IsArray()
    member: string []
    constructor(data: WorkSpace){
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.userCreate = data.userId;
        this.name = data.name;
        this.image = data.image;
        this.member = data.member;
    }
}


export class FindAllWorkspaceForAdminOutput extends PaginationResponse<FindAllWorkSpaceForAdminData>{
    @IsArray()
    @RefSchemaArray(FindAllWorkSpaceForAdminData)
    data: FindAllWorkSpaceForAdminData[];

    setData(list: WorkSpace[]):void{
        this.data = list.map((e)=> new FindAllWorkSpaceForAdminData(e));
    }
}