
import { GenderType, RoleType } from "../../enums/user/userEnum";
import { IEntity } from "../base/IEntity";



export interface IUser extends IEntity<string>{
    role: RoleType;
    firstName:string;
    lastName:string;
    gender: GenderType | null;
    birthDay: string | null;
    avatar: string | null;
}