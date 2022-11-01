import { StatusType } from "../../enums/user/userEnum";
import { IWorkSpace } from "../workspace/IWorkSpace";
import { IUser } from "./IUser";



export interface IClient extends IUser{
    userName:string;
    passWord:string;
    email:string;
    activeKey: string | null;
    status: StatusType;
    
    // relationship
    workSpaces: IWorkSpace[];
}