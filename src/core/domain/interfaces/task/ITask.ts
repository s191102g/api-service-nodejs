import { IEntity } from "../base/IEntity";
import { IData } from "../datas/IData";


export interface ITask extends IEntity<string>{
    title:string;
    content:string;
    position:number;
    dataId:string;
    deadline: string | null;
    // relationship
    datas:IData;
}