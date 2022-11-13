"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const BaseEntyti_1 = require("../base/BaseEntyti");
const Data_1 = require("../datas/Data");
class Task extends BaseEntyti_1.BaseEntity {
    get title() {
        return this.data.title;
    }
    set title(val) {
        this.data.title = val;
    }
    get content() {
        return this.data.content;
    }
    set content(val) {
        this.data.content = val;
    }
    get position() {
        return this.data.position;
    }
    set position(val) {
        this.data.position = val;
    }
    get dataId() {
        return this.data.dataId;
    }
    set dataId(val) {
        this.data.dataId = val;
    }
    get datas() {
        return this.data.datas && new Data_1.Data(this.data.datas);
    }
}
exports.Task = Task;
