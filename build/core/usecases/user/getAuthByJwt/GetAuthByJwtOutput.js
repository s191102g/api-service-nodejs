"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserAuthByJwtQueryOutput = exports.GetUserAuthByJwtQueryData = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const RefSchema_1 = require("../../../shared/decorators/RefSchema");
const DataResponse_1 = require("../../../shared/usecase/DataResponse");
class GetUserAuthByJwtQueryData {
}
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], GetUserAuthByJwtQueryData.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], GetUserAuthByJwtQueryData.prototype, "role", void 0);
exports.GetUserAuthByJwtQueryData = GetUserAuthByJwtQueryData;
class GetUserAuthByJwtQueryOutput extends DataResponse_1.DataResponse {
    setData(param) {
        this.data = new GetUserAuthByJwtQueryData();
        this.data.userId = param.userId;
        this.data.role = param.role;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsObject)(),
    (0, RefSchema_1.RefSchemaObject)(GetUserAuthByJwtQueryData),
    tslib_1.__metadata("design:type", GetUserAuthByJwtQueryData)
], GetUserAuthByJwtQueryOutput.prototype, "data", void 0);
exports.GetUserAuthByJwtQueryOutput = GetUserAuthByJwtQueryOutput;
