import { IsDate, IsString } from "class-validator";
import { Sang } from "../../../../domain/entities/sang/Sang";
import { DataResponse } from "../../../../shared/usecase/DataResponse";

export class FindSangQueryData {

    @IsString()
    name:string;

    @IsDate()
    createdAt:Date
    constructor(data:Sang){
        this.name = data.name
        this.createdAt = data.createdAt
    }
}

export class FindSangQueryOutput extends DataResponse<FindSangQueryData[]>{
    data: FindSangQueryData[]

    setData(list: Sang[]):void{
        this.data = list.map((e)=> new FindSangQueryData(e))
    }
}