import { IsString } from "class-validator";

export class UpdatePassClientInput {
    @IsString()
    oldPass: string;

    @IsString()
    newPass: string;
}