import { IsString } from "class-validator";


export class LoginClientInput {
    @IsString()
    username:string;

    @IsString()
    password:string;
}