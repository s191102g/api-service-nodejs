
import {  IsObject, IsString, IsUUID } from "class-validator";
import { RefSchemaObject } from "../../../shared/decorators/RefSchema";
import { DataResponse } from "../../../shared/usecase/DataResponse";

export class GetUserAuthByJwtQueryData {
  @IsUUID()
  userId: string;

  @IsString()
  role: string;


}

export class GetUserAuthByJwtQueryOutput extends DataResponse<GetUserAuthByJwtQueryData> {
  @IsObject()
  @RefSchemaObject(GetUserAuthByJwtQueryData)
  data: GetUserAuthByJwtQueryData;

  setData(param: { userId: string; role: string}): void {
    this.data = new GetUserAuthByJwtQueryData();
    this.data.userId = param.userId;
    this.data.role = param.role;
  
  }
}
