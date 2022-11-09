import { IsString, IsUUID } from "class-validator";



export class AddMemberWorkspaceInput{
    @IsString()
    emailUser:string;

    @IsUUID()
    idWorkSpace: string;
}