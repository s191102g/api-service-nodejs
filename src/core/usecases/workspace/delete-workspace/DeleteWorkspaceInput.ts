import { IsString } from "class-validator";


export class DeleteWorkspaceInput{
    @IsString()
    userId: string;
    @IsString()
    id: string;
}