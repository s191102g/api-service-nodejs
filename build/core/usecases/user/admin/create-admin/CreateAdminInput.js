"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminInput = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateAdminInput {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAdminInput.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateAdminInput.prototype, "password", void 0);
exports.CreateAdminInput = CreateAdminInput;
