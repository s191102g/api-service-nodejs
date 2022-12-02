import { IsString } from "class-validator";


export class ResendActiveInput {
    @IsString()
    email:string;
}