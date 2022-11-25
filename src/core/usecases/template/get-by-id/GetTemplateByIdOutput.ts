import { IsArray, IsDate,  IsObject, IsString, IsUUID } from "class-validator";
import { Template } from "../../../domain/entities/template/Template";
import { RefSchemaObject } from "../../../shared/decorators/RefSchema";
import { DataResponse } from "../../../shared/usecase/DataResponse";


export class GetTemplateByIdData{
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


export class GetTemplateByIdOutput extends DataResponse<GetTemplateByIdData>{
    @IsObject()
    @RefSchemaObject(GetTemplateByIdData)
    data: GetTemplateByIdData;


    setData(val: Template){
        this.data= new GetTemplateByIdData(val)
    }
}