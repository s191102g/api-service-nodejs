import { IsArray, IsDate, IsString, IsUUID } from "class-validator";
import { Template } from "../../../domain/entities/template/Template";
import { RefSchemaArray } from "../../../shared/decorators/RefSchema";
import { PaginationResponse } from "../../../shared/usecase/PaginationResponse";



export class FindTemplateData{
    @IsUUID()
    id: string;

    @IsDate()
    createdAt: Date;

    @IsString()
    typeByString: string;
    
    @IsArray()
    usageFields: any[];

    constructor(data: Template){
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.typeByString = data.typeByString;
        this.usageFields = data.usageFields
    }
}


export class FindTemplateOutput extends PaginationResponse<FindTemplateData>{
    @IsArray()
    @RefSchemaArray(FindTemplateData)
    data: FindTemplateData[];

    setData(list: Template[]):void{
        this.data = list.map((e)=> new FindTemplateData(e));
    }
}