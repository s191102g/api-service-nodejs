"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mapper_1 = require("../../../utils/mapper");
const MessageError_1 = require("./message/MessageError");
class UnauthorizedError extends Error {
    constructor(errObj = MessageError_1.MessageError.UNAUTHORIZED, ...params) {
        super();
        this.stack = '';
        this.httpCode = 401;
        this.code = errObj.code;
        this.name = "UnauthorizedError";
        this.message =
            params && params.length
                ? (0, mapper_1.mapTemplate)(errObj.message, ...params)
                : errObj.message;
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UnauthorizedError.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UnauthorizedError.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UnauthorizedError.prototype, "message", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UnauthorizedError.prototype, "stack", void 0);
exports.UnauthorizedError = UnauthorizedError;
