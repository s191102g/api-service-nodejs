import { IsArray, IsDate, IsEnum, IsString, IsUUID } from "class-validator";
import { Client } from "../../../../domain/entities/user/Client";
import { GenderType, RoleType, StatusType } from "../../../../domain/enums/userEnum";
import { RefSchemaArray } from "../../../../shared/decorators/RefSchema";
import { PaginationResponse } from "../../../../shared/usecase/PaginationResponse";



export class FindAllClientData{
    @IsUUID()
    id: string;

    @IsDate()
    createdAt: Date;

    @IsString()
    email:string;
 
    @IsString()
    password:string;
 
    @IsString()
    image: string;
   
    @IsEnum(RoleType)
    role: RoleType;

    @IsString()
    firstName:string;

    @IsString()
    lastName:string | null;

    @IsEnum(GenderType)
    gender: GenderType | null;

    @IsDate()
    birthDay: Date | null;

    @IsString()
    avatar: string | null;

    @IsEnum(StatusType)
    status: StatusType
    constructor(data: Client){
        this.id = data.id;
        this.createdAt = data.createdAt;
       this.firstName = data.firstName;
       this.lastName = data.lastName;
       this.email = data.email;
       this.password = data.passWord;
       this.role = data.role;
       this.birthDay = data.birthDay;
       this.avatar = data.avatar;
       this.gender =data.gender;
       this.status = data.status;
    }
}


export class FindAllCientOutput extends PaginationResponse<FindAllClientData>{
    @IsArray()
    @RefSchemaArray(FindAllClientData)
    data: FindAllClientData[];

    setData(list: Client[]):void{
        this.data = list.map((e)=> new FindAllClientData(e));
    }
}