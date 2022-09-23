"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sang = void 0;
const BaseEntyti_1 = require("../base/BaseEntyti");
class Sang extends BaseEntyti_1.BaseEntity {
    get name() {
        return this.data.name;
    }
    set name(val) {
        this.data.name = val;
    }
}
exports.Sang = Sang;
