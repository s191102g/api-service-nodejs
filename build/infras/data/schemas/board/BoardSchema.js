"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BOARD_SCHEMA = void 0;
const BaseSchema_1 = require("../base/BaseSchema");
exports.BOARD_SCHEMA = {
    TABLE_NAME: "board",
    COLUMNS: {
        ...BaseSchema_1.BASE_SCHEMA.COLUMNS,
        TITLE: "title",
        ICON: "icon",
        POSITION: "position",
        DESCRIPTION: "description",
        FAVOURITE: "favourite",
        FAVOURITE_POSITION: "favourite_position",
        WORKSPACE_ID: "workspace_id",
        TEMPLATE_ID: "template_id"
    }
};
