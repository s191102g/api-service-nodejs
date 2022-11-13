"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const BaseEntyti_1 = require("../base/BaseEntyti");
const Board_1 = require("../board/Board");
class Template extends BaseEntyti_1.BaseEntity {
    get typeByString() {
        return this.data.typeByString;
    }
    set typeByString(val) {
        this.data.typeByString = val;
    }
    get usageFields() {
        return this.data.usageFields;
    }
    set usageFields(val) {
        this.data.usageFields = val;
    }
    get board() {
        return this.data.board && new Board_1.Board(this.data.board);
    }
}
exports.Template = Template;
