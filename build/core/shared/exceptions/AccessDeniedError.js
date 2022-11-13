"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const MessageError_1 = require("./message/MessageError");
class AccessDeniedError extends Error {
    constructor() {
        super();
        this.httpCode = 403;
        this.code = MessageError_1.MessageError.ACCESS_DENIED.code;
        this.name = "AccessDeniedError";
        this.message = MessageError_1.MessageError.ACCESS_DENIED.message;
        this.stack = '';
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AccessDeniedError.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AccessDeniedError.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AccessDeniedError.prototype, "message", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AccessDeniedError.prototype, "stack", void 0);
exports.AccessDeniedError = AccessDeniedError;
