
import {  Res, Get, JsonController, Post, Body } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import {  Service } from 'typedi';
import { Container } from 'typeorm-typedi-extensions';
import { CreateSangCommandHandle } from '../../../../core/usecases/sang/commands/create/CreateSangCommandHandler';
import { CreateSangCommandInput } from '../../../../core/usecases/sang/commands/create/CreateSangCommandInput';
import { CreateSangCommandOutput } from '../../../../core/usecases/sang/commands/create/CreateSangCommandOutput';


@Service()
@JsonController('/test2')
export class UserController {
  private readonly _createHandle = Container.get(CreateSangCommandHandle) 
  constructor(
     
  ){}

  @Post('/')
  @OpenAPI({summary:"create"})
  @ResponseSchema(CreateSangCommandOutput)
  async test(
      @Body() param:CreateSangCommandInput
  ): Promise<CreateSangCommandOutput> {
     return await this._createHandle.handle(param) 
  }


  @Get('/')
  getAllUsers( @Res() response: any) {
    return response.send('Hello response!');
  }
}