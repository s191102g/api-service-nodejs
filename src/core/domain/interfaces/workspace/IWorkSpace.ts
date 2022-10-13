
import { IEntity } from "../base/IEntity";
import { IClient } from "../user/IClient";



export interface IWorkSpace extends IEntity<string>{
    userId:string;
    image:string;
    member: string [] ;

   /* Relationship */
  client: IClient
}