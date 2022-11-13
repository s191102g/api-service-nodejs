"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAdminInput = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class LoginAdminInput {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginAdminInput.prototype, "username", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginAdminInput.prototype, "password", void 0);
exports.LoginAdminInput = LoginAdminInput;
