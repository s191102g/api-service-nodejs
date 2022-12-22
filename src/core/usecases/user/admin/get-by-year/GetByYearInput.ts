import { IsString } from "class-validator";

export class GetByYearInput{
    @IsString()
    Start: string;
    @IsString()
    End: string;
}