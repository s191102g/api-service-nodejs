"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const userEnum_1 = require("../../../../core/domain/enums/userEnum");
const CreateAdminHandler_1 = require("../../../../core/usecases/user/admin/create-admin/CreateAdminHandler");
const CreateAdminInput_1 = require("../../../../core/usecases/user/admin/create-admin/CreateAdminInput");
const CreateAdminOutput_1 = require("../../../../core/usecases/user/admin/create-admin/CreateAdminOutput");
const LoginAdminHandler_1 = require("../../../../core/usecases/user/admin/login-admin/LoginAdminHandler");
const LoginAdminInput_1 = require("../../../../core/usecases/user/admin/login-admin/LoginAdminInput");
const LoginAdminOutput_1 = require("../../../../core/usecases/user/admin/login-admin/LoginAdminOutput");
let AdminController = class AdminController {
    constructor(_createAdminHandler, _loginAdminHandler) {
        this._createAdminHandler = _createAdminHandler;
        this._loginAdminHandler = _loginAdminHandler;
    }
    async register(param) {
        return await this._createAdminHandler.handle(param);
    }
    async login(param) {
        return await this._loginAdminHandler.handle(param);
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/create"),
    (0, routing_controllers_1.Authorized)(userEnum_1.RoleType.Admin),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "register admin" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(CreateAdminOutput_1.CreateAdminOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateAdminInput_1.CreateAdminInput]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminController.prototype, "register", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/login"),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "login admin" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(LoginAdminOutput_1.LoginAdminOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [LoginAdminInput_1.LoginAdminInput]),
    tslib_1.__metadata("design:returntype", Promise)
], AdminController.prototype, "login", null);
AdminController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/v1/admins"),
    tslib_1.__metadata("design:paramtypes", [CreateAdminHandler_1.CreateAdminHandler,
        LoginAdminHandler_1.LoginAdminHandler])
], AdminController);
exports.AdminController = AdminController;
