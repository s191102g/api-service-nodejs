"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const tslib_1 = require("tslib");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const crypt_1 = require("../../../../utils/crypt");
const User_1 = require("./User");
class Admin extends User_1.UserBase {
    constructor() {
        super(...arguments);
        this._cryptoService = typedi_1.default.get("crypto.service");
    }
    get userName() {
        return this._cryptoService.decrypt(this.data.userName);
    }
    set userName(val) {
        this.data.userName = this._cryptoService.encrypt(val);
    }
    get passWord() {
        return this.data.passWord;
    }
    set passWord(val) {
        this.data.passWord = this._hashPassword(val);
    }
    _hashPassword(password) {
        return (0, crypt_1.hashMD5)(password, "$$");
    }
    comparePassword(password) {
        return this.passWord === this._hashPassword(password);
    }
}
exports.Admin = Admin;
