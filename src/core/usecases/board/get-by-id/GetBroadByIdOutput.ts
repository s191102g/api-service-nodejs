import { IsDate, IsNumber, IsObject, IsString, IsUUID } from "class-validator";
import { Board } from "../../../domain/entities/board/Board";
import { FavouriteType } from "../../../domain/enums/user/boardEnum";
import { RefSchemaObject } from "../../../shared/decorators/RefSchema";
import { DataResponse } from "../../../shared/usecase/DataResponse";


export class GetBoardByIdData{
    @IsUUID()
    id: string;

    @IsDate()
    createdAt: Date;

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


    constructor(data: Board){
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.icon = data.icon;
        this.position = data.position;
        this.favourite = data.favourite;
        this.favouritePosition = data.favouritePosition;
        this.workSpaceId = data.workSpaceId;
        this.templateId = data.templateId;
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