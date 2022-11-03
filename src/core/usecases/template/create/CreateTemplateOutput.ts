import { IsUUID } from "class-validator";
import { DataResponse } from "../../../shared/usecase/DataResponse";




export class CreateTemplateOutput extends DataResponse<string>{
    @IsUUID()
    data: string;

    setData(val: string){
        this.data = val
    }
}