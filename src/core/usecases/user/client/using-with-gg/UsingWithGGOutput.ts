import { IsJWT } from "class-validator";
import { DataResponse } from "../../../../shared/usecase/DataResponse";


export class UsingWithGGOutput extends DataResponse<string>{
    @IsJWT()
    data: string;

    setData(val: string):void{
        this.data = val;
    }
}