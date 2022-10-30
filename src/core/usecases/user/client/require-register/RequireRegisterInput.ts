import { IsString } from "class-validator";


export class RequireRegisterInput {
    @IsString()
    email:string;
}