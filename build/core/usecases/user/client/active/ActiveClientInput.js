"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveClientInput = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class ActiveClientInput {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActiveClientInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ActiveClientInput.prototype, "activeKey", void 0);
exports.ActiveClientInput = ActiveClientInput;
