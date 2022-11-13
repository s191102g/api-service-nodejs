"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputValidationError = exports.InputValidationFieldError = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const RefSchema_1 = require("../decorators/RefSchema");
const MessageError_1 = require("./message/MessageError");
class InputValidationFieldError {
    constructor(error) {
        this.name = error.property;
        this.value = error.value;
        if (error.constraints && Object.keys(error.constraints).length) {
            this.message = error.constraints[Object.keys(error.constraints)[0]];
        }
        if (error.children && error.children.length) {
            this.children = error.children.map((item) => new InputValidationFieldError(item));
        }
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InputValidationFieldError.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Allow)(),
    tslib_1.__metadata("design:type", Object)
], InputValidationFieldError.prototype, "value", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InputValidationFieldError.prototype, "message", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, RefSchema_1.RefSchemaArray)(InputValidationFieldError),
    tslib_1.__metadata("design:type", Array)
], InputValidationFieldError.prototype, "children", void 0);
exports.InputValidationFieldError = InputValidationFieldError;
class InputValidationError extends Error {
    constructor(errors) {
        super();
        this.stack = '';
        this.httpCode = 400;
        this.name = "InputValidationError";
        this.code = MessageError_1.MessageError.INPUT_VALIDATION.code;
        this.message = MessageError_1.MessageError.INPUT_VALIDATION.message;
        if (errors) {
            this.fields = errors.map((item) => new InputValidationFieldError(item));
        }
    }
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InputValidationError.prototype, "code", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InputValidationError.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InputValidationError.prototype, "message", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], InputValidationError.prototype, "stack", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, RefSchema_1.RefSchemaArray)(InputValidationFieldError),
    tslib_1.__metadata("design:type", Array)
], InputValidationError.prototype, "fields", void 0);
exports.InputValidationError = InputValidationError;
