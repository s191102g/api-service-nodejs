"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkSpace = void 0;
const class_validator_1 = require("class-validator");
const MessageError_1 = require("../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../shared/exceptions/SystemError");
const BaseEntyti_1 = require("../base/BaseEntyti");
const Board_1 = require("../board/Board");
const Client_1 = require("../user/Client");
class WorkSpace extends BaseEntyti_1.BaseEntity {
    get name() {
        return this.data.name;
    }
    set name(val) {
        this.data.name = val;
    }
    get userId() {
        return this.data.userId;
    }
    set userId(val) {
        if (!(0, class_validator_1.isUUID)(val)) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_INVALID, 'userId');
        }
        this.data.userId = val;
    }
    get image() {
        return this.data.image;
    }
    set image(val) {
        this.data.image = val;
    }
    get member() {
        return this.data.member;
    }
    set member(val) {
        this.data.member = val;
    }
    get client() {
        return this.data.client && new Client_1.Client(this.data.client);
    }
    get board() {
        return this.data.board && this.data.board.map((e) => new Board_1.Board(e));
    }
    static validateImageFile(file) {
        const maxSize = 100 * 1024;
        const formats = ["jpeg", "jpg", "png", "gif"];
        const format = file.mimetype.replace("image/", "");
        if (!formats.includes(format)) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_FORMAT_INVALID, "image", formats.join(", "));
        }
        if (file.size > maxSize) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_SIZE_MAX, "image", maxSize / 1024, "KB");
        }
    }
    static getImagePath(id, ext) {
        return `workspace/${id}.${ext}`;
    }
}
exports.WorkSpace = WorkSpace;
