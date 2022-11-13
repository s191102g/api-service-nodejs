"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLiteralObject = exports.validateDataInput = void 0;
const class_validator_1 = require("class-validator");
const InputValidationError_1 = require("../../core/shared/exceptions/InputValidationError");
async function validateDataInput(data) {
    const errors = await (0, class_validator_1.validate)(data, {
        whitelist: true,
        validationError: { target: false },
    });
    if (errors && errors.length) {
        throw new InputValidationError_1.InputValidationError(errors);
    }
}
exports.validateDataInput = validateDataInput;
function isLiteralObject(val) {
    return !!val && typeof val === "object" && !(0, class_validator_1.isArray)(val) && !(0, class_validator_1.isDate)(val);
}
exports.isLiteralObject = isLiteralObject;
