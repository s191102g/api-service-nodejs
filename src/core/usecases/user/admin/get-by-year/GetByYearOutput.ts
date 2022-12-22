
import { DataResponse } from "../../../../shared/usecase/DataResponse";



export class GetByYearOutput extends DataResponse<any>{
   data: any;

   setData(val:any){
    this.data = val;
   }
}