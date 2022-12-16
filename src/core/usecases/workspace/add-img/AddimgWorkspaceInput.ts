import { IsString } from "class-validator";


export class AddimgWorkspaceInput{
    @IsString()
    image: string;
}