import { IsBoolean } from "class-validator";
import { DataResponse } from "../../../shared/usecase/DataResponse";


export class UpdateWorkspaceOutput extends DataResponse<boolean>{
    @IsBoolean()
    data: boolean;

    setData(val: boolean): void{
        this.data = val;
    }
}