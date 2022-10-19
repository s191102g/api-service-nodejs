import { IsArray, IsOptional, IsString } from "class-validator";


export class CreateWorkspaceInput {

    @IsString()
    image:string;

    @IsArray()
    @IsOptional()
    member: any[];
}