"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemError = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mapper_1 = require("../../../utils/mapper");
class SystemError extends Error {
    constructor(errObj, ...params) {
        super();
        this.httpCode = 500;
        this.code = errObj.code;
        this.name = "SystemError";
        this.stack = '';
        this.message =
            params && params.length
                ? (0, mapper_1.mapTemplate)(errObj.message, ...params)
                : errObj.message;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SystemError.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SystemError.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SystemError.prototype, "message", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], SystemError.prototype, "stack", void 0);
exports.SystemError = SystemError;
