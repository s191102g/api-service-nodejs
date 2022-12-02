import { IsDate, IsEnum, IsObject, IsString, IsUUID } from "class-validator";
import { Admin } from "../../../../domain/entities/user/Admin";
import { GenderType } from "../../../../domain/enums/userEnum";
import { RefSchemaObject } from "../../../../shared/decorators/RefSchema";
import { DataResponse } from "../../../../shared/usecase/DataResponse";

export class GetAdminProfileData{
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
    username: string;

    constructor(data: Admin){
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        this.birthDay = data.birthDay;
        this.avatar = data.avatar;
        this.username = data.userName;
    }
}

export  class GetAdminProfileOutput extends DataResponse<GetAdminProfileData>{

    @IsObject()
    @RefSchemaObject(GetAdminProfileData)
    data: GetAdminProfileData;

    setData(val: Admin){
        this.data = new GetAdminProfileData(val)
    }
}