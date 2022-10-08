

import { IsString } from "class-validator";
import { mapTemplate } from "../../../utils/mapper";
import { ErrorObject } from "./message/ErrorObject";

export class SystemError extends Error {
  httpCode: number;

  @IsString()
  code: string;

  @IsString()
  override name: string;

  @IsString()
  override message: string;

  @IsString()
  override stack: string;
  
  constructor(errObj: ErrorObject, ...params: any[]) {
    super();
    this.httpCode = 500;
    this.code = errObj.code;
    this.name = "SystemError";
    this.stack = ''
    this.message =
      params && params.length
        ? mapTemplate(errObj.message, ...params)
        : errObj.message;

  }
}
