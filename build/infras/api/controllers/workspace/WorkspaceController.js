"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const UserAuthenticated_1 = require("../../../../core/shared/UserAuthenticated");
const CreateWorkspaceHandler_1 = require("../../../../core/usecases/workspace/create/CreateWorkspaceHandler");
const CreateWorkspaceInput_1 = require("../../../../core/usecases/workspace/create/CreateWorkspaceInput");
const FindWorkspaceHandler_1 = require("../../../../core/usecases/workspace/find-all/FindWorkspaceHandler");
const FindWorkspaceOutput_1 = require("../../../../core/usecases/workspace/find-all/FindWorkspaceOutput");
const CreateWorkspaceOutput_1 = require("../../../../core/usecases/workspace/create/CreateWorkspaceOutput");
const AddMemberWorkspaceOutput_1 = require("../../../../core/usecases/workspace/add-member/AddMemberWorkspaceOutput");
const AddMemberWorkspaceInput_1 = require("../../../../core/usecases/workspace/add-member/AddMemberWorkspaceInput");
const AddMemberWorkspaceHandler_1 = require("../../../../core/usecases/workspace/add-member/AddMemberWorkspaceHandler");
const DeleteWorkspaceHandler_1 = require("../../../../core/usecases/workspace/delete-workspace/DeleteWorkspaceHandler");
const DeleteWorkspaceOutput_1 = require("../../../../core/usecases/workspace/delete-workspace/DeleteWorkspaceOutput");
const DeleteWorkspaceInput_1 = require("../../../../core/usecases/workspace/delete-workspace/DeleteWorkspaceInput");
let WorkspaceController = class WorkspaceController {
    constructor(_createWorkspaceHandler, _findWorkspaceHandler, _addMemberWorkspaceHandler, _deleteWorkspaceHandler) {
        this._createWorkspaceHandler = _createWorkspaceHandler;
        this._findWorkspaceHandler = _findWorkspaceHandler;
        this._addMemberWorkspaceHandler = _addMemberWorkspaceHandler;
        this._deleteWorkspaceHandler = _deleteWorkspaceHandler;
    }
    async create(param, userAuth) {
        return await this._createWorkspaceHandler.handle(userAuth.userId, param);
    }
    async getByUser(userAuth) {
        return await this._findWorkspaceHandler.handle(userAuth.userId);
    }
    async addMember(param, userAuth) {
        return await this._addMemberWorkspaceHandler.handle(userAuth.userId, param);
    }
    async delete(id, userAuth) {
        const param = new DeleteWorkspaceInput_1.DeleteWorkspaceInput;
        param.id = id;
        param.userId = userAuth.userId;
        return await this._deleteWorkspaceHandler.handle(param);
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "Add new workspace" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(CreateWorkspaceOutput_1.CreateWorkspaceOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateWorkspaceInput_1.CreateWorkspaceInput,
        UserAuthenticated_1.UserAuthenticated]),
    tslib_1.__metadata("design:returntype", Promise)
], WorkspaceController.prototype, "create", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Get)('/'),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "Get all workspace have user" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(FindWorkspaceOutput_1.FindWorkspaceOutput),
    tslib_1.__param(0, (0, routing_controllers_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UserAuthenticated_1.UserAuthenticated]),
    tslib_1.__metadata("design:returntype", Promise)
], WorkspaceController.prototype, "getByUser", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Patch)("/add-member"),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "add member for workspace" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(AddMemberWorkspaceOutput_1.AddMemberWorkspaceOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__param(1, (0, routing_controllers_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [AddMemberWorkspaceInput_1.AddMemberWorkspaceInput,
        UserAuthenticated_1.UserAuthenticated]),
    tslib_1.__metadata("design:returntype", Promise)
], WorkspaceController.prototype, "addMember", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Delete)("/:id([0-9a-f-]{36})"),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "delete workspace" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(DeleteWorkspaceOutput_1.DeleteWorkspaceOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Param)("id")),
    tslib_1.__param(1, (0, routing_controllers_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, UserAuthenticated_1.UserAuthenticated]),
    tslib_1.__metadata("design:returntype", Promise)
], WorkspaceController.prototype, "delete", null);
WorkspaceController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/v1/workspace'),
    tslib_1.__metadata("design:paramtypes", [CreateWorkspaceHandler_1.CreateWorkspaceHandler,
        FindWorkspaceHandler_1.FindWorkSpacehandler,
        AddMemberWorkspaceHandler_1.AddMemberWorkspaceHandler,
        DeleteWorkspaceHandler_1.DeleteWorkspaceHandler])
], WorkspaceController);
exports.WorkspaceController = WorkspaceController;
