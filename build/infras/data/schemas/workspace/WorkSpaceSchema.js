"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WORKSPACE_SCHEMA = void 0;
const BaseSchema_1 = require("../base/BaseSchema");
exports.WORKSPACE_SCHEMA = {
    TABLE_NAME: "workspace",
    COLUMNS: {
        ...BaseSchema_1.BASE_SCHEMA.COLUMNS,
        USER_ID: "user_id",
        IMAGE: "image",
        MEMBER: "member",
        NAME: "name"
    },
    RELATED_MANY: {
        BOARD: "board"
    }
};
