import { Service } from "typedi";
import { Authorized, Body,  Delete,  Get,  JsonController, Param, Post, Put, QueryParams } from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { CreateTaskInput } from "../../../../core/usecases/task/create-task/CreateTaskInput";
import { CreateTaskOutput } from "../../../../core/usecases/task/create-task/CreateTaskOutput";
import { CreateTaskHandler } from "../../../../core/usecases/task/create-task/CreateTaskHandler";
import { FindTaskInput } from "../../../../core/usecases/task/find-task/FindTaskInput";
import { FindTaskOutput } from "../../../../core/usecases/task/find-task/FindTaskOutput";
import { FindTaskHandler } from "../../../../core/usecases/task/find-task/FindTaskHandler";
import { DeleteTaskHandler } from "../../../../core/usecases/task/delete-task/DeleteTaskHandler";
import { UpdateTaskHandler } from "../../../../core/usecases/task/update-task/UpdateTaskHandler";
import { DeleteTaskOutput } from "../../../../core/usecases/task/delete-task/DeleteTaskOutput";
import { UpdateTaskInput } from "../../../../core/usecases/task/update-task/UpdateTaskInput";
import { UpdateTaskOutput } from "../../../../core/usecases/task/update-task/UpdateTaskOutput";

@Service()
@JsonController("/v1/tasks")
export class TaskController{
    constructor(
       private readonly _createTaskHandler: CreateTaskHandler,
       private readonly _findTaskHandler: FindTaskHandler,
       private readonly _updateTaskHandler: UpdateTaskHandler,
       private readonly _deleteTaskHandler: DeleteTaskHandler,
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

    @Put("/:id([0-9a-f-]{36})")
    @OpenAPI({summary: "update task"})
    @Authorized(RoleType.Client)
    @ResponseSchema(UpdateTaskOutput)
    async update(
        @Param("id") id:string,
        @Body() param: UpdateTaskInput,
    ): Promise<UpdateTaskOutput> {
        return await this._updateTaskHandler.handle(id,param)
    }

    @Delete("/:id([0-9a-f-]{36})")
    @Authorized(RoleType.Client)
    @OpenAPI({summary:"delete task"})
    @ResponseSchema(DeleteTaskOutput)
    async delete(
        @Param("id") id: string
    ): Promise<DeleteTaskOutput>{
        return await this._deleteTaskHandler.handle(id)
    }

}