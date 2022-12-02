import { IsUUID } from "class-validator";

export class BanClienInput {
    @IsUUID()
    idUser: string;
}