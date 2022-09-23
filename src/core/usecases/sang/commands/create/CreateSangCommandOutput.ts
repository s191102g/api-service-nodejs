
import { IsUUID } from "class-validator";
import { DataResponse } from "../../../../shared/usecase/DataResponse";




export class CreateSangCommandOutput  extends DataResponse<string>{
    @IsUUID()
    data: string;
  
    setData(data: string): void {
      this.data = data;
    }
}