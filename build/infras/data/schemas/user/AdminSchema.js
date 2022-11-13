"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_SCHEMA = void 0;
const UserSchema_1 = require("./UserSchema");
exports.ADMIN_SCHEMA = {
    TABLE_NAME: "admin",
    COLUMNS: {
        ...UserSchema_1.USER_SCHEMA.COLUMNS,
        USER_NAME: "username",
        PASS_WORD: "password"
    }
};
