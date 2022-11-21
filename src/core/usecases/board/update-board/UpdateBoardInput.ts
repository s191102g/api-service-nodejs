import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";


export class UpdateBoardInput {
    @IsString()
    @IsOptional()
    title:string;

    @IsString()
    @IsOptional()
    icon:string;

    @IsString()
    @IsOptional()
    description:string;

    @IsNumber()
    @IsOptional()
    position:number;

    @IsString()
    @IsOptional()
    favourite: string;

    @IsNumber()
    @IsOptional()
    favouritePosition:number;

    @IsUUID()
    @IsOptional()
    templateId:string;

    @IsUUID()
    workspaceId: string;
}