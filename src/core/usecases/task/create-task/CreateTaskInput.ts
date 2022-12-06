import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";


export class CreateTaskInput {

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsNumber()
    @IsOptional()
    position: number;

    @IsUUID()
    dataId: string;
}