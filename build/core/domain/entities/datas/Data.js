"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
const BaseEntyti_1 = require("../base/BaseEntyti");
const Board_1 = require("../board/Board");
const Task_1 = require("../task/Task");
class Data extends BaseEntyti_1.BaseEntity {
    get heading() {
        return this.data.heading;
    }
    set heading(val) {
        this.data.heading = val;
    }
    get boardId() {
        return this.data.boardId;
    }
    set boardId(val) {
        this.data.boardId = val;
    }
    get board() {
        return this.data.board && new Board_1.Board(this.data.board);
    }
    get tasks() {
        return this.data.tasks && this.data.tasks.map((e) => new Task_1.Task(e));
    }
}
exports.Data = Data;
