import { IsString } from "class-validator";



export class LoginAdminInput {
    @IsString()
    username: string;
    @IsString()
    password: string;
}