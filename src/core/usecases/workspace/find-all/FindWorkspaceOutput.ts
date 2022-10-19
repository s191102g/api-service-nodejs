import { IsArray, IsDate, IsString, IsUUID } from "class-validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { RefSchemaArray } from "../../../shared/decorators/RefSchema";

export class FindWorkspaceData{
   @IsUUID()
   id:string;

   @IsDate()
   createdAt: Date;

   @IsString()
   image:string;

   @IsArray()
   member:any [];

   constructor(data: WorkSpace){
     this.id = data.id;
     this.createdAt = data.createdAt;
     this.image = data.image;
     this.member = data.member;
   }
}


export class FindWorkspaceOutput {
    @IsArray()
    @RefSchemaArray(FindWorkspaceData)
    data: FindWorkspaceData[];

   setData(val: WorkSpace[] ):void{
    this.data = val.map((e)=> new FindWorkspaceData(e))
   }
}