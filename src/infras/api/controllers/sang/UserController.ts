import {
  Res,
  Get,
  JsonController,
  Post,
  Body,
  Delete,
  Param,
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { Service } from "typedi";
// import { Container } from 'typeorm-typedi-extensions';
import { CreateSangCommandHandle } from "../../../../core/usecases/sang/commands/create/CreateSangCommandHandler";
import { CreateSangCommandInput } from "../../../../core/usecases/sang/commands/create/CreateSangCommandInput";
import { CreateSangCommandOutput } from "../../../../core/usecases/sang/commands/create/CreateSangCommandOutput";
import { DeleteSangCommandHandler } from "../../../../core/usecases/sang/commands/delete/DeleteSangCommandHandler";
import { DeleteSangcommandOutput } from "../../../../core/usecases/sang/commands/delete/DeleteSangCommandOutput";
import { FindSangQueryHandler } from "../../../../core/usecases/sang/queries/find/FindSangQueryHandler";
import { FindSangQueryOutput } from "../../../../core/usecases/sang/queries/find/FindSangQueryOutput";

@Service()
@JsonController("/test2")
export class UserController {
  constructor(
    private readonly _createHandle: CreateSangCommandHandle,
    private readonly _findHandle: FindSangQueryHandler,
    private readonly _deleteHandle: DeleteSangCommandHandler
  ) {}

  @Post("/")
  @OpenAPI({ summary: "create" })
  @ResponseSchema(CreateSangCommandOutput)
  async add(
    @Body() param: CreateSangCommandInput
  ): Promise<CreateSangCommandOutput> {
    return await this._createHandle.handle(param);
  }

  @Get("/all")
  @OpenAPI({ summary: "get all" })
  async find(): Promise<FindSangQueryOutput> {
    return await this._findHandle.handle();
  }

  @Delete("/:id([0-9a-f-]{36})")
  @OpenAPI({ summary: "delete" })
  @ResponseSchema(DeleteSangcommandOutput)
  async delete(@Param("id") id: string): Promise<DeleteSangcommandOutput> {
    return await this._deleteHandle.handle(id);
  }

  @Get("/")
  getAllUsers(@Res() response: any) {
    return response.send("Hello response!");
  }
}
