import { IsString } from "class-validator";




export class CreateSangCommandInput {
    @IsString()
    name: string;
}