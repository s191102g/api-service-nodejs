import { IsArray, IsDate, IsNumber, IsObject, IsString, IsUUID } from "class-validator";
import { Board } from "../../../domain/entities/board/Board";
import { FavouriteType } from "../../../domain/enums/boardEnum";
import { RefSchemaArray, RefSchemaObject } from "../../../shared/decorators/RefSchema";
import { DataResponse } from "../../../shared/usecase/DataResponse";
import { GetDataByIdData } from "../../datas/get-data-by-id/GetDataByIdOutput";


export class GetBoardByIdData{
    @IsUUID()
    id: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updateAt: Date;

    @IsString()
    title:string;

    @IsString()
    icon:string;

    @IsNumber()
    position:number;

    @IsString()
    description:string | null;

    @IsString()
    favourite:FavouriteType;


    @IsNumber()
    favouritePosition:number;

    @IsUUID()
    workSpaceId:string;

    @IsUUID()
    templateId:string;

    @IsArray()
    @RefSchemaArray(GetDataByIdData)
    datas: GetDataByIdData[] | null;

    constructor(data: Board){
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.title = data.title;
        this.icon = data.icon;
        this.description = data.description;
        this.position = data.position;
        this.favourite = data.favourite;
        this.favouritePosition = data.favouritePosition;
        this.workSpaceId = data.workSpaceId;
        this.templateId = data.templateId;
        this.updateAt = data.updatedAt;
        this.datas = data.datas && data.datas.map((e) => new GetDataByIdData(e))
    }
}


export class GetBoardByIdOutput extends DataResponse<GetBoardByIdData>{
    @IsObject()
    @RefSchemaObject(GetBoardByIdData)
    data: GetBoardByIdData;


    setData(val: Board){
        this.data= new GetBoardByIdData(val)
    }
}