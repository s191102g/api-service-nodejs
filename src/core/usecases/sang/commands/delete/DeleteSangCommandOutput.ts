import { IsBoolean } from "class-validator";
import { DataResponse } from "../../../../shared/usecase/DataResponse";



export class DeleteSangcommandOutput extends DataResponse<boolean>{
  @IsBoolean()
  data:boolean;

  setData(data:boolean):void{
       this.data = data
  }
}