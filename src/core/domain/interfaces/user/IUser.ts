
import { GenderType, RoleType } from "../../enums/userEnum";
import { IEntity } from "../base/IEntity";



export interface IUser extends IEntity<string>{
    role: RoleType;
    firstName:string;
    lastName:string;
    gender: GenderType | null;
    birthDay: Date | null;
    avatar: string | null;
}