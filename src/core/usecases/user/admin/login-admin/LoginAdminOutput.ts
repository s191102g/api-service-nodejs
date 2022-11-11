import { IsJWT } from "class-validator";
import { DataResponse } from "../../../../shared/usecase/DataResponse";


export class LoginAdminOutput extends DataResponse<string>{
    @IsJWT()
    data: string;

    setData(val: string){
        this.data = val;
    }
}