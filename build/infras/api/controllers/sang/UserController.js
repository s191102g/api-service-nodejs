"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const CreateSangCommandHandler_1 = require("../../../../core/usecases/sang/commands/create/CreateSangCommandHandler");
const CreateSangCommandInput_1 = require("../../../../core/usecases/sang/commands/create/CreateSangCommandInput");
const CreateSangCommandOutput_1 = require("../../../../core/usecases/sang/commands/create/CreateSangCommandOutput");
let UserController = class UserController {
    constructor() {
        this._createHandle = typeorm_typedi_extensions_1.Container.get(CreateSangCommandHandler_1.CreateSangCommandHandle);
    }
    async test(param) {
        return await this._createHandle.handle(param);
    }
    getAllUsers(response) {
        return response.send('Hello response!');
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/'),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "create" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(CreateSangCommandOutput_1.CreateSangCommandOutput),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSangCommandInput_1.CreateSangCommandInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "test", null);
__decorate([
    (0, routing_controllers_1.Get)('/'),
    __param(0, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
UserController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)('/test2'),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
