import { IsString } from "class-validator";


export class CreateAdminInput{
    @IsString()
    username: string;

    @IsString()
    password: string;
}