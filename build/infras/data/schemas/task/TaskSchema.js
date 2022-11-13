"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASK_SCHEMA = void 0;
const BaseSchema_1 = require("../base/BaseSchema");
exports.TASK_SCHEMA = {
    TABLE_NAME: "task",
    COLUMNS: {
        ...BaseSchema_1.BASE_SCHEMA.COLUMNS,
        TITLE: "title",
        CONTENT: "content",
        POSITION: "position",
        DATA_ID: "data-id"
    }
};
