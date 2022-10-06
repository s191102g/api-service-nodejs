import {  Res, Get, JsonController } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@JsonController('/test')
export class UserController {
  @Get('/')
  @OpenAPI({summary:"Get test"})
  getAllUsers( @Res() response: any) {
    return response.send('Hello response !');
  }
}