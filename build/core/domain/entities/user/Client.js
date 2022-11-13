"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const crypt_1 = require("../../../../utils/crypt");
const MessageError_1 = require("../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../shared/exceptions/SystemError");
const WorkSpace_1 = require("../workspace/WorkSpace");
const User_1 = require("./User");
class Client extends User_1.UserBase {
    constructor() {
        super(...arguments);
        this._cryptoService = typedi_1.default.get("crypto.service");
    }
    get userName() {
        return this._cryptoService.decrypt(this.data.userName);
    }
    set userName(val) {
        if (!val) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_INVALID, "username");
        }
        if (!(0, class_validator_1.isString)(val)) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_INVALID, "username");
        }
        this.data.userName = this._cryptoService.encrypt(val);
    }
    get passWord() {
        return this.data.passWord;
    }
    set passWord(val) {
        const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()-_=+[{\]}\\|;:'",<.>/?]).{8,20}$/;
        if (!regExp.test(val)) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_LEN_AT_LEAST_AND_MAX_SPECIAL, "password", 6, 20);
        }
        this.data.passWord = this._hashPassword(val);
    }
    get email() {
        return this._cryptoService.decrypt(this.data.email);
    }
    set email(val) {
        this.data.email = this._cryptoService.encrypt(val);
    }
    get activeKey() {
        return this.data.activeKey;
    }
    set activeKey(val) {
        this.data.activeKey = val;
    }
    get status() {
        return this.data.status;
    }
    set status(val) {
        this.data.status = val;
    }
    get workSpaces() {
        return this.data.workSpaces && this.data.workSpaces.map((e) => new WorkSpace_1.WorkSpace(e));
    }
    _hashPassword(password) {
        return (0, crypt_1.hashMD5)(password, "$$");
    }
    comparePassword(password) {
        return this.passWord === this._hashPassword(password);
    }
}
exports.Client = Client;
