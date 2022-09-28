
import {
  IsString,

} from "class-validator";

import { MessageError } from "./message/MessageError";



export class InputValidationError extends Error {
  httpCode: number;

  @IsString()
  code: string;

  @IsString()
  override name: string;

  @IsString()
  override message: string;
  @IsString()
  override stack: string;
  constructor() {
    super();
    this.httpCode = 400;
    this.name = "InputValidationError";
    this.code = MessageError.INPUT_VALIDATION.code;
    this.message = MessageError.INPUT_VALIDATION.message;
    this.stack = ''
  }
  
  
}
