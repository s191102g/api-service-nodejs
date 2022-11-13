"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefSchemaArray = exports.RefSchemaObject = exports.COMPONENT_SCHEMA_PATH = void 0;
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
exports.COMPONENT_SCHEMA_PATH = "#/components/schemas/";
function RefSchemaObject(type) {
    return (0, class_validator_jsonschema_1.JSONSchema)({
        type: "object",
        $ref: exports.COMPONENT_SCHEMA_PATH + type.name,
    });
}
exports.RefSchemaObject = RefSchemaObject;
function RefSchemaArray(type) {
    return (0, class_validator_jsonschema_1.JSONSchema)({
        type: "array",
        items: { $ref: exports.COMPONENT_SCHEMA_PATH + type.name },
    });
}
exports.RefSchemaArray = RefSchemaArray;
