import {  Res, Get, JsonController } from 'routing-controllers';

@JsonController('/test3')
export class UserController {
  @Get('/')
  getAllUsers( @Res() response: any) {
    return response.send('Hello response dasdsd!');
  }
}