import { Pay, StatusType, TypeUse } from "../../enums/userEnum";
import { IWorkSpace } from "../workspace/IWorkSpace";
import { IUser } from "./IUser";



export interface IClient extends IUser{
    userName:string;
    passWord:string;
    email:string;
    activeKey: string | null;
    status: StatusType;
    typeUse: TypeUse| null;
    pay: Pay | null;
    // relationship
    workSpaces: IWorkSpace[];
}