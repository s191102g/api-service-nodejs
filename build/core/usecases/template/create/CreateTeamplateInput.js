"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTemplateInput = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateTemplateInput {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTemplateInput.prototype, "typeByString", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateTemplateInput.prototype, "usageField", void 0);
exports.CreateTemplateInput = CreateTemplateInput;
