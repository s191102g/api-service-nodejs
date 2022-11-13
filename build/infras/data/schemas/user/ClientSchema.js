"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_SCHEMA = void 0;
const UserSchema_1 = require("./UserSchema");
exports.CLIENT_SCHEMA = {
    TABLE_NAME: "client",
    COLUMNS: {
        ...UserSchema_1.USER_SCHEMA.COLUMNS,
        USER_NAME: "username",
        PASS_WORD: "password",
        EMAIL: "email",
        ACTIVEKEY: "active_key",
        STATUS: "status"
    }
};
