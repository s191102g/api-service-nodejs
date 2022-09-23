
import { ISang } from "../../interfaces/sang/ISang";
import { BaseEntity } from "../base/BaseEntyti";



export class Sang extends BaseEntity <string, ISang> implements ISang {

    get name(): string {
        return this.data.name;
      }
    
    set name(val: string) {
        this.data.name = val;
    }
}