import { IUser } from "./IUser";



export interface IClient extends IUser{
    userName:string;
    passWord:string;
    email:string;

}