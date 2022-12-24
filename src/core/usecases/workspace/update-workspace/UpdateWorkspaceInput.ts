import { IsOptional, IsString } from "class-validator";


export class UpdateWorkspaceInput {
    @IsString()
    name:string;
    
    @IsString()
    @IsOptional()
    image: string;
}