"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_SCHEMA = void 0;
const BaseSchema_1 = require("../base/BaseSchema");
exports.DATA_SCHEMA = {
    TABLE_NAME: "data",
    COLUMNS: {
        ...BaseSchema_1.BASE_SCHEMA.COLUMNS,
        HEADING: "heading",
        BOARD_ID: "board_id"
    }
};
