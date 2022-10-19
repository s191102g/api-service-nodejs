
import { ITemplate } from "../../interfaces/template/ITemplate";
import { BaseEntity } from "../base/BaseEntyti";
import { Board } from "../board/Board";


export class Template extends BaseEntity<string,ITemplate> implements ITemplate{

    get typeByString(): string{
       return this.data.typeByString
    }

    set typeByString(val:string){
        this.data.typeByString = val
    }

    get usageFields(): any[]{
        return this.data.usageFields
    }

    set usageFields(val: any[]){
        this.data.usageFields = val
    }

    get board(): Board {
        return this.data.board && new Board(this.data.board)
    }
}