import { IsArray, IsOptional, IsString } from "class-validator";


export class CreateWorkspaceInput {
    @IsString()
    name:string;
    
    @IsArray()
    @IsOptional()
    member: any[];
}