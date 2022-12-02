import { IsDate, IsEnum, IsObject, IsString, IsUUID } from "class-validator";
import { Client } from "../../../../domain/entities/user/Client";
import { GenderType } from "../../../../domain/enums/userEnum";
import { RefSchemaObject } from "../../../../shared/decorators/RefSchema";
import { DataResponse } from "../../../../shared/usecase/DataResponse";

export class GetClientProfileData{
    @IsUUID()
    id: string;

    @IsString()
    firstName:string;

    @IsString()
    lastName:string;

    @IsEnum(GenderType)
    gender: GenderType | null;

    @IsDate()
    birthDay: Date | null;

    @IsString()
    avatar: string | null;

    @IsString()
    email: string;

    constructor(data: Client){
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        this.birthDay = data.birthDay;
        this.avatar = data.avatar;
        this.email = data.email;
    }
}

export  class GetClientProfileOutput extends DataResponse<GetClientProfileData>{

    @IsObject()
    @RefSchemaObject(GetClientProfileData)
    data: GetClientProfileData;

    setData(val: Client){
        this.data = new GetClientProfileData(val)
    }
}