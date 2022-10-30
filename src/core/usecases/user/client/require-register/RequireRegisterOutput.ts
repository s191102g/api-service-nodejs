import { IsBoolean } from "class-validator";
import { DataResponse } from "../../../../shared/usecase/DataResponse";


export class RequireRegisterOutput extends DataResponse<boolean>{
    @IsBoolean()
    data: boolean;

    setData(val: boolean){
        this.data = val
    }
}