"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserBase = void 0;
const BaseEntyti_1 = require("../base/BaseEntyti");
class UserBase extends BaseEntyti_1.BaseEntity {
    get role() {
        return this.data.role;
    }
    set role(val) {
        this.data.role = val;
    }
    get firstName() {
        return this.data.firstName;
    }
    set firstName(val) {
        this.data.firstName = val;
    }
    get lastName() {
        return this.data.lastName;
    }
    set lastName(val) {
        this.data.lastName = val;
    }
    get avatar() {
        return this.data.avatar;
    }
    set avatar(val) {
        this.data.avatar = val;
    }
    get gender() {
        return this.data.gender;
    }
    set gender(val) {
        this.data.gender = val;
    }
    get birthDay() {
        return this.data.birthDay;
    }
    set birthday(val) {
        this.data.birthDay = val;
    }
}
exports.UserBase = UserBase;
class User extends UserBase {
}
exports.User = User;
