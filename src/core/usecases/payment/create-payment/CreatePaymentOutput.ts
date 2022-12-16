import { IsString } from "class-validator";
import { DataResponse } from "../../../shared/usecase/DataResponse";


export class CreatePaymentOutput extends DataResponse<string>{
    @IsString()
    data: string;

    setData(val:string){
        this.data = val
    }
}