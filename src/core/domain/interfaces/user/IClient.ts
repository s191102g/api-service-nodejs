import { IWorkSpace } from "../workspace/IWorkSpace";
import { IUser } from "./IUser";



export interface IClient extends IUser{
    userName:string;
    passWord:string;
    email:string;
    
    // relationship
    workSpaces: IWorkSpace[];
}