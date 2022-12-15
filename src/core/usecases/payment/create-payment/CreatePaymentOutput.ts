import { IsUUID } from "class-validator";
import { DataResponse } from "../../../shared/usecase/DataResponse";


export class CreatePaymentOutput extends DataResponse<boolean>{
    @IsUUID()
    data: boolean;

    setData(val:boolean){
        this.data = val
    }
}