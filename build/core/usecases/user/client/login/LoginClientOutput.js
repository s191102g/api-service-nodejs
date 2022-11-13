"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginClientOutput = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const DataResponse_1 = require("../../../../shared/usecase/DataResponse");
class LoginClientOutput extends DataResponse_1.DataResponse {
    setData(val) {
        this.data = val;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsJWT)(),
    tslib_1.__metadata("design:type", String)
], LoginClientOutput.prototype, "data", void 0);
exports.LoginClientOutput = LoginClientOutput;
