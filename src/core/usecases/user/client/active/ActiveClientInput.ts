import { IsString } from "class-validator";


export class ActiveClientInput{
    @IsString()
    email:string;

    @IsString()
    activeKey: string;
}