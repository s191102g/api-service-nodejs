import { IsUUID } from "class-validator";

export class UnbanClienInput {
    @IsUUID()
    idUser: string;
}