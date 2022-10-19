import { IEntity } from "../base/IEntity";
import { IData } from "../datas/IData";
import { ITemplate } from "../template/ITemplate";
import { IWorkSpace } from "../workspace/IWorkSpace";



export interface IBoard extends IEntity<string>{
    title:string;
    icon:string;
    position:number;
    description:string;
    favourite:string;
    favouritePosition:number;
    workSpaceId:string;
    templateId:string;

     /* Relationship */
     workSpace: IWorkSpace;
     template: ITemplate;
     datas: IData[];
}