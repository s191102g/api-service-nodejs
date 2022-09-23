"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SANG_SCHEMA = void 0;
const baseSchema_1 = require("../base/baseSchema");
exports.SANG_SCHEMA = {
    TABLE_NAME: "test",
    COLUMNS: {
        ...baseSchema_1.BASE_SCHEMA.COLUMNS,
        NAME: "name"
    }
};
