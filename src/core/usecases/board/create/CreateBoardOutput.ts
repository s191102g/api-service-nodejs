import {  IsUUID } from "class-validator";
import { DataResponse } from "../../../shared/usecase/DataResponse";



export class CreateBoardOutput extends DataResponse<string>{
    @IsUUID()
    data: string;

    setData(val: string):void{
        this.data = val
    }
}