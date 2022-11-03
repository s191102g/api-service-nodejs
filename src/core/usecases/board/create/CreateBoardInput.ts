import {  IsNumber, IsOptional, IsString, IsUUID } from "class-validator";



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

    @IsString()
    favourite: string;

    @IsNumber()
    favouritePosition:number;

    @IsUUID()
    workspaceId: string;

    @IsUUID()
    templateId:string;
}