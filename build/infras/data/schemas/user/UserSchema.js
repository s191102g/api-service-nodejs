"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_SCHEMA = void 0;
const BaseSchema_1 = require("../base/BaseSchema");
exports.USER_SCHEMA = {
    TABLE_NAME: "user",
    COLUMNS: {
        ...BaseSchema_1.BASE_SCHEMA.COLUMNS,
        ROLE: "role",
        FIRST_NAME: "first_name",
        LAST_NAME: "last_name",
        AVATAR: "avatar",
        GENDER: "gender",
        BIRTHDAY: "birth_day"
    }
};
