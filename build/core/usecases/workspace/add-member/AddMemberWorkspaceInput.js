"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMemberWorkspaceInput = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class AddMemberWorkspaceInput {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AddMemberWorkspaceInput.prototype, "emailUser", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], AddMemberWorkspaceInput.prototype, "idWorkSpace", void 0);
exports.AddMemberWorkspaceInput = AddMemberWorkspaceInput;
