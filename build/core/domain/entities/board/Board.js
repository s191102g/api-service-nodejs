"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const BaseEntyti_1 = require("../base/BaseEntyti");
const Data_1 = require("../datas/Data");
const Template_1 = require("../template/Template");
const WorkSpace_1 = require("../workspace/WorkSpace");
class Board extends BaseEntyti_1.BaseEntity {
    get title() {
        return this.data.title;
    }
    set title(val) {
        this.data.title = val;
    }
    get icon() {
        return this.data.icon;
    }
    set icon(val) {
        this.data.icon = val;
    }
    get position() {
        return this.data.position;
    }
    set position(val) {
        this.data.position = val;
    }
    get description() {
        return this.data.description;
    }
    set description(val) {
        this.data.description = val;
    }
    get favourite() {
        return this.data.favourite;
    }
    set favourite(val) {
        this.data.favourite = val;
    }
    get favouritePosition() {
        return this.data.favouritePosition;
    }
    set favouritePosition(val) {
        this.data.favouritePosition = val;
    }
    get workSpaceId() {
        return this.data.workSpaceId;
    }
    set workSpaceId(val) {
        this.data.workSpaceId = val;
    }
    get templateId() {
        return this.data.templateId;
    }
    set templateId(val) {
        this.data.templateId = val;
    }
    get workSpace() {
        return this.data.workSpace && new WorkSpace_1.WorkSpace(this.data.workSpace);
    }
    get template() {
        return this.data.template && new Template_1.Template(this.data.template);
    }
    get datas() {
        return this.data.datas && this.data.datas.map((e) => new Data_1.Data(e));
    }
}
exports.Board = Board;
