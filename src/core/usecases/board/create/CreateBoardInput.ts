import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";



export class CreateBoardInput{
    @IsString()
    @IsOptional()
    title:string;

    @IsString()
    icon:string;

    @IsString()
    @IsOptional()
    description:string;

    @IsNumber()
    position:number;

    @IsBoolean()
    favourite: boolean;

    @IsNumber()
    favouritePosition:number;

    @IsUUID()
    workspaceId: string;

    @IsUUID()
    templateId:string;
}