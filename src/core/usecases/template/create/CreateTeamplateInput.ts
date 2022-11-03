import { IsArray, IsString } from "class-validator";


export class CreateTemplateInput{
    @IsString()
    typeByString: string;

    @IsArray()
    usageField: string[];
}