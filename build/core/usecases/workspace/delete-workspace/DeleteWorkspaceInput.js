"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWorkspaceInput = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class DeleteWorkspaceInput {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], DeleteWorkspaceInput.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], DeleteWorkspaceInput.prototype, "id", void 0);
exports.DeleteWorkspaceInput = DeleteWorkspaceInput;
