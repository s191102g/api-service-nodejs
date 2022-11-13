"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTemplateHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../utils/validator");
const Template_1 = require("../../../domain/entities/template/Template");
const CommandHandler_1 = require("../../../shared/usecase/CommandHandler");
const CreateTemplateOutput_1 = require("./CreateTemplateOutput");
let CreateTemplateHandler = class CreateTemplateHandler extends CommandHandler_1.CommandHandler {
    constructor(_templateRepository) {
        super();
        this._templateRepository = _templateRepository;
    }
    async handle(param) {
        await (0, validator_1.validateDataInput)(param);
        const data = new Template_1.Template();
        data.typeByString = param.typeByString;
        data.usageFields = param.usageField;
        const id = await this._templateRepository.create(data);
        const result = new CreateTemplateOutput_1.CreateTemplateOutput();
        result.setData(id);
        return result;
    }
};
CreateTemplateHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)("template.repository")),
    tslib_1.__metadata("design:paramtypes", [Object])
], CreateTemplateHandler);
exports.CreateTemplateHandler = CreateTemplateHandler;
