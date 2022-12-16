import { IsString } from "class-validator";

export class ForgotPassInput{
    @IsString()
    email:string;
}