"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBoardByIdOutput = exports.GetBoardByIdData = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const boardEnum_1 = require("../../../domain/enums/boardEnum");
const RefSchema_1 = require("../../../shared/decorators/RefSchema");
const DataResponse_1 = require("../../../shared/usecase/DataResponse");
class GetBoardByIdData {
    constructor(data) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.icon = data.icon;
        this.position = data.position;
        this.favourite = data.favourite;
        this.favouritePosition = data.favouritePosition;
        this.workSpaceId = data.workSpaceId;
        this.templateId = data.templateId;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], GetBoardByIdData.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDate)(),
    tslib_1.__metadata("design:type", Date)
], GetBoardByIdData.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], GetBoardByIdData.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], GetBoardByIdData.prototype, "icon", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], GetBoardByIdData.prototype, "position", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], GetBoardByIdData.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], GetBoardByIdData.prototype, "favourite", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], GetBoardByIdData.prototype, "favouritePosition", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], GetBoardByIdData.prototype, "workSpaceId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], GetBoardByIdData.prototype, "templateId", void 0);
exports.GetBoardByIdData = GetBoardByIdData;
class GetBoardByIdOutput extends DataResponse_1.DataResponse {
    setData(val) {
        this.data = new GetBoardByIdData(val);
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, RefSchema_1.RefSchemaObject)(GetBoardByIdData),
    tslib_1.__metadata("design:type", GetBoardByIdData)
], GetBoardByIdOutput.prototype, "data", void 0);
exports.GetBoardByIdOutput = GetBoardByIdOutput;
