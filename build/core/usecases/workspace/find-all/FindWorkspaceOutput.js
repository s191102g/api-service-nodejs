"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindWorkspaceOutput = exports.FindWorkspaceData = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const RefSchema_1 = require("../../../shared/decorators/RefSchema");
const GetBroadByIdOutput_1 = require("../../board/get-by-id/GetBroadByIdOutput");
class FindWorkspaceData {
    constructor(data) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.name = data.name;
        this.image = data.image;
        this.member = data.member;
        this.userCreated = data.userId;
        this.board = data.board && data.board.map((e) => new GetBroadByIdOutput_1.GetBoardByIdData(e));
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], FindWorkspaceData.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], FindWorkspaceData.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FindWorkspaceData.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FindWorkspaceData.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], FindWorkspaceData.prototype, "member", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], FindWorkspaceData.prototype, "userCreated", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, RefSchema_1.RefSchemaArray)(GetBroadByIdOutput_1.GetBoardByIdData),
    tslib_1.__metadata("design:type", Object)
], FindWorkspaceData.prototype, "board", void 0);
exports.FindWorkspaceData = FindWorkspaceData;
class FindWorkspaceOutput {
    setData(val) {
        this.data = val.map((e) => new FindWorkspaceData(e));
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, RefSchema_1.RefSchemaArray)(FindWorkspaceData),
    tslib_1.__metadata("design:type", Array)
], FindWorkspaceOutput.prototype, "data", void 0);
exports.FindWorkspaceOutput = FindWorkspaceOutput;
