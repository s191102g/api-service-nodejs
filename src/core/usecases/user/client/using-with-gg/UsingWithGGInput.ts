import { IsOptional, IsString } from "class-validator";


export class UsingWithGGInput {
    @IsString()
    name: string;
    
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsOptional()
    avatar: string;
}