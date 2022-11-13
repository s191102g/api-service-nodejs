"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const ActiveClientHandler_1 = require("../../../../core/usecases/user/client/active/ActiveClientHandler");
const ActiveClientInput_1 = require("../../../../core/usecases/user/client/active/ActiveClientInput");
const ActiveClientOutput_1 = require("../../../../core/usecases/user/client/active/ActiveClientOutput");
const CreateClientHandler_1 = require("../../../../core/usecases/user/client/create/CreateClientHandler");
const CreateClientInput_1 = require("../../../../core/usecases/user/client/create/CreateClientInput");
const CreateClientOutput_1 = require("../../../../core/usecases/user/client/create/CreateClientOutput");
const LoginClientHandler_1 = require("../../../../core/usecases/user/client/login/LoginClientHandler");
const LoginClientInput_1 = require("../../../../core/usecases/user/client/login/LoginClientInput");
const LoginClientOutput_1 = require("../../../../core/usecases/user/client/login/LoginClientOutput");
const RequireRegisterHandler_1 = require("../../../../core/usecases/user/client/require-register/RequireRegisterHandler");
const RequireRegisterInput_1 = require("../../../../core/usecases/user/client/require-register/RequireRegisterInput");
const RequireRegisterOutput_1 = require("../../../../core/usecases/user/client/require-register/RequireRegisterOutput");
let ClientController = class ClientController {
    constructor(_createClientHandler, _loginClientHandler, _requireRegisterHandler, _activeClientHandler) {
        this._createClientHandler = _createClientHandler;
        this._loginClientHandler = _loginClientHandler;
        this._requireRegisterHandler = _requireRegisterHandler;
        this._activeClientHandler = _activeClientHandler;
    }
    async requireRegister(param) {
        return await this._requireRegisterHandler.handle(param);
    }
    async active(param) {
        return await this._activeClientHandler.handle(param);
    }
    async register(param) {
        return await this._createClientHandler.handle(param);
    }
    async login(param) {
        return await this._loginClientHandler.handle(param);
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/require-register"),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "require register client" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(RequireRegisterOutput_1.RequireRegisterOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [RequireRegisterInput_1.RequireRegisterInput]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientController.prototype, "requireRegister", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)('/active'),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "active" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(ActiveClientOutput_1.ActiveClientOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ActiveClientInput_1.ActiveClientInput]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientController.prototype, "active", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/register"),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "register client" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(CreateClientOutput_1.CreateClientOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateClientInput_1.CreateClientInput]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientController.prototype, "register", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/login"),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "Login" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(LoginClientOutput_1.LoginClientOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [LoginClientInput_1.LoginClientInput]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientController.prototype, "login", null);
ClientController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/v1/clients"),
    tslib_1.__metadata("design:paramtypes", [CreateClientHandler_1.CreateClientHandler,
        LoginClientHandler_1.LoginClientHandler,
        RequireRegisterHandler_1.RequireRegisterHandler,
        ActiveClientHandler_1.ActiveClientHandler])
], ClientController);
exports.ClientController = ClientController;
