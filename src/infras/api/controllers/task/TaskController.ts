import { Service } from "typedi";
import { Authorized, Body,  Get,  JsonController, Post, QueryParams } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { CreateTaskInput } from "../../../../core/usecases/task/create-task/CreateTaskInput";
import { CreateTaskOutput } from "../../../../core/usecases/task/create-task/CreateTaskOutput";
import { CreateTaskHandler } from "../../../../core/usecases/task/create-task/CreateTaskHandler";
import { FindTaskInput } from "../../../../core/usecases/task/find-task/FindTaskInput";
import { FindTaskOutput } from "../../../../core/usecases/task/find-task/FindTaskOutput";
import { FindTaskHandler } from "../../../../core/usecases/task/find-task/FindTaskHandler";

@Service()
@JsonController("/v1/tasks")
export class TaskController{
    constructor(
       private readonly _createTaskHandler: CreateTaskHandler,
       private readonly _findTaskHandler: FindTaskHandler
    ){}

    @Post("/")
    @OpenAPI({summary: " Create task"})
    @Authorized(RoleType.Client)
    @ResponseSchema(CreateTaskOutput)
    async create(

        @Body() param: CreateTaskInput,
    ): Promise<CreateTaskOutput> {
        return await this._createTaskHandler.handle(param)
    }

    @Get("/")
    @OpenAPI({summary: " find task"})
    @Authorized(RoleType.Client)
    @ResponseSchema(FindTaskOutput)
    async get(

        @QueryParams() param: FindTaskInput,
    ): Promise<FindTaskOutput> {
        return await this._findTaskHandler.handle(param)
    }

}