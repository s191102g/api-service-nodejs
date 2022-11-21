import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateDataInput {
    @IsString()
    @IsOptional()
    heading: string | null;

    @IsString()
    @IsOptional()
    title: string | null;

    @IsString()
    @IsOptional()
    content: string | null;

    @IsUUID()
    boardId: string;
}