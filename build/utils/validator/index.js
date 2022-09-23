"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLiteralObject = exports.validateDataInput = void 0;
/* eslint-disable @typescript-eslint/ban-types */
// import { InputValidationError } from "@shared/exceptions/InputValidationError";
const class_validator_1 = require("class-validator");
/**
 * Validate data input
 */
async function validateDataInput(data) {
    const errors = await (0, class_validator_1.validate)(data, {
        whitelist: true,
        validationError: { target: false },
    });
    if (errors && errors.length) {
        throw new Error('Errors');
    }
}
exports.validateDataInput = validateDataInput;
/**
 * Check whether the value is a literal object or not
 */
function isLiteralObject(val) {
    return !!val && typeof val === "object" && !(0, class_validator_1.isArray)(val) && !(0, class_validator_1.isDate)(val);
}
exports.isLiteralObject = isLiteralObject;
