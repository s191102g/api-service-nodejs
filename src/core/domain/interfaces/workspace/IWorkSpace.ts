
import { IEntity } from "../base/IEntity";
import { IBoard } from "../board/IBoard";
import { IClient } from "../user/IClient";



export interface IWorkSpace extends IEntity<string>{
    userId:string;
    image:string;
    name:string
    member: string [] ;

   /* Relationship */
   client: IClient;
   board: IBoard[];
}