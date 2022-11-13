"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateController = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const CreateTeamplateInput_1 = require("../../../../core/usecases/template/create/CreateTeamplateInput");
const CreateTemplateHandler_1 = require("../../../../core/usecases/template/create/CreateTemplateHandler");
const CreateTemplateOutput_1 = require("../../../../core/usecases/template/create/CreateTemplateOutput");
let TemplateController = class TemplateController {
    constructor(_createTemplateHandler) {
        this._createTemplateHandler = _createTemplateHandler;
    }
    async create(param) {
        return await this._createTemplateHandler.handle(param);
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.Post)("/"),
    (0, routing_controllers_openapi_1.OpenAPI)({ summary: "create new template" }),
    (0, routing_controllers_openapi_1.ResponseSchema)(CreateTemplateOutput_1.CreateTemplateOutput),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateTeamplateInput_1.CreateTemplateInput]),
    tslib_1.__metadata("design:returntype", Promise)
], TemplateController.prototype, "create", null);
TemplateController = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/v1/template"),
    tslib_1.__metadata("design:paramtypes", [CreateTemplateHandler_1.CreateTemplateHandler])
], TemplateController);
exports.TemplateController = TemplateController;
