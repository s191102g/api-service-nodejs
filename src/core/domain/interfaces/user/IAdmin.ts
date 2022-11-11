import { IUser } from "./IUser";



export interface IAdmin extends IUser{
    userName:string;
    passWord:string;

}