"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientInput = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateClientInput {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateClientInput.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], CreateClientInput.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateClientInput.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateClientInput.prototype, "password", void 0);
exports.CreateClientInput = CreateClientInput;
