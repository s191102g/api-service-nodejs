"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixAmount = exports.convertObjectToString = exports.convertStringToBoolean = exports.convertToCurrency = void 0;
const class_validator_1 = require("class-validator");
function convertToCurrency(value, option) {
    if (!value) {
        value = 0;
    }
    if (!option) {
        option = { format: "", currency: "" };
    }
    if (!option.format) {
        option.format = "en-US";
    }
    if (!option.currency) {
        option.currency = "USD";
    }
    return value.toLocaleString(option.format, {
        style: "currency",
        currency: option.currency,
    });
}
exports.convertToCurrency = convertToCurrency;
function convertStringToBoolean(val, defaultValue = false) {
    if (!val) {
        return defaultValue;
    }
    switch (val.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
            return false;
        default:
            return defaultValue;
    }
}
exports.convertStringToBoolean = convertStringToBoolean;
function convertObjectToString(val, isPrettified = false) {
    if (!val) {
        return "";
    }
    if (isPrettified) {
        return JSON.stringify(val, undefined, 2);
    }
    return JSON.stringify(val, undefined, "");
}
exports.convertObjectToString = convertObjectToString;
function fixAmount(number) {
    const n = (0, class_validator_1.isNumberString)(number)
        ? parseFloat(number)
        : number;
    return Math.round((n + Number.EPSILON) * 100) / 100;
}
exports.fixAmount = fixAmount;
