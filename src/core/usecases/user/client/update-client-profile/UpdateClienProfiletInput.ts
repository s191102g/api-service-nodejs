import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { GenderType } from "../../../../domain/enums/userEnum";


export class UpdateClientProfileInput {

    @IsString()
    @IsOptional()
    firstName:string;

    @IsEnum(GenderType)
    @IsOptional()
    gender: GenderType | null;

    @IsDate()
    @IsOptional()
    birthDay: Date | null;

    @IsString()
    @IsOptional()
    avatar: string | null;

    @IsString()
    @IsOptional()
    email: string;
}