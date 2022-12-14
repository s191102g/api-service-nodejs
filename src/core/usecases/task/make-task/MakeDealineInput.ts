import { IsOptional, IsString } from "class-validator";

export class MakeDealineInput {
    @IsString()
    taskId: string;

    @IsOptional()
    dealine: any;
}