import { IsNotEmptyObject } from "class-validator";


export class AddimgWorkspaceInput{
    @IsNotEmptyObject()
    file: Express.Multer.File
}