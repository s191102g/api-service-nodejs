import { IsArray, IsDate, IsString, IsUUID } from "class-validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { RefSchemaArray } from "../../../shared/decorators/RefSchema";
import { GetBoardByIdData } from "../../board/get-by-id/GetBroadByIdOutput";

export class FindWorkspaceData{
   @IsUUID()
   id:string;

   @IsDate()
   createdAt: Date;

   @IsString()
   image:string;

   @IsString()
   name:string;

   @IsArray()
   member:any [];

   @IsUUID()
   userCreated: string;

   @IsArray()
   @RefSchemaArray(GetBoardByIdData)
  board: GetBoardByIdData[] | null;
   constructor(data: WorkSpace){
     this.id = data.id;
     this.createdAt = data.createdAt;
     this.name = data.name;
     this.image = data.image;
     this.member = data.member;
     this.userCreated = data.userId;
     this.board = data.board && data.board.map((e) => new GetBoardByIdData(e))
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