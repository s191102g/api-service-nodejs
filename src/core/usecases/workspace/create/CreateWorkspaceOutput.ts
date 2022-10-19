import { IsString } from "class-validator";
import { DataResponse } from "../../../shared/usecase/DataResponse";


export class CreateWorkspaceOutput extends DataResponse<string>{
    @IsString()
    data: string;

    setData(val:string):void{
          this.data = val
    }
}