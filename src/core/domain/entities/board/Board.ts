
import { FavouriteType } from "../../enums/boardEnum";
import { IBoard } from "../../interfaces/board/IBoard";
import { BaseEntity } from "../base/BaseEntyti";
import { Data } from "../datas/Data";
import { Template } from "../template/Template";
import { WorkSpace } from "../workspace/WorkSpace";




export class Board extends BaseEntity<string,IBoard> implements IBoard{
    get title(): string{
        return this.data.title
    }
    set title(val:string){
         this.data.title = val
    }
    
    get icon(): string{
        return this.data.icon
    }
    set icon(val:string){
        this.data.icon =val
    }

    get position(): number{
        return this.data.position
    }
    set position(val:number){
        this.data.position = val
    }

    get description(): string | null{
        return this.data.description
    }
    set description(val:string | null){
        this.data.description = val
    }

    get favourite(): FavouriteType{
        return this.data.favourite
    }
    set favourite(val:FavouriteType){
        this.data.favourite = val
    }
    
    get favouritePosition(): number{
        return this.data.favouritePosition
    }
    set favouritePosition(val:number){
         this.data.favouritePosition = val
    }

    get workSpaceId(): string{
        return this.data.workSpaceId
    }
    set workSpaceId(val:string){
         this.data.workSpaceId = val
    }
     
    get templateId():string{
        return this.data.templateId 
    }
    set templateId(val:string){
         this.data.templateId = val
    }

    
    /* Relationship */
    get workSpace(): WorkSpace{
        return this.data.workSpace && new WorkSpace(this.data.workSpace)
    }
   get template(): Template{
    return this.data.template && new Template(this.data.template)
   }

   get datas(): Data[]{
    return this.data.datas && this.data.datas.map((e)=> new Data(e))
   }
   
   
}