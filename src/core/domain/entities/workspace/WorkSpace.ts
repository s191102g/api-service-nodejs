import { isUUID } from "class-validator";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { IWorkSpace } from "../../interfaces/workspace/IWorkSpace";
import { BaseEntity } from "../base/BaseEntyti";
import { Client } from "../user/Client";




export class WorkSpace extends BaseEntity<string, IWorkSpace> implements IWorkSpace{
    get userId(): string{
        return this.data.userId
    }

    set userId(val:string){
        if(!isUUID(val)){
            throw new SystemError(MessageError.DATA_INVALID,'userId')
        }
        this.data.userId = val
    }

    get image(): string{
        return this.data.image
    }
    set image(val: string){
        this.data.image = val
    }

    get member(): string[]{
        return this.data.member
    }

    set member(val: string []){
        if(!isUUID(val)){
            throw new SystemError(MessageError.DATA_INVALID,'userId')
        }
        this.data.member = val
    }


    /* Relationship */
    get client(): Client{
          return this.data.client && new Client(this.data.client)
    }
}