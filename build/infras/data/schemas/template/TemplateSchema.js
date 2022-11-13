"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_SCHEMA = void 0;
const BaseSchema_1 = require("../base/BaseSchema");
exports.TEMPLATE_SCHEMA = {
    TABLE_NAME: "template",
    COLUMNS: {
        ...BaseSchema_1.BASE_SCHEMA.COLUMNS,
        TYPE_BY_STRING: "type_by_string",
        USAGE_FIELDS: "USAGE_FIELD"
    }
};
