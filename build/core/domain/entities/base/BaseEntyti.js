"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
class BaseEntity {
    constructor(data = {}) {
        this.data = data;
    }
    get id() {
        return this.data.id;
    }
    set id(val) {
        this.data.id = val;
    }
    get createdAt() {
        return this.data.createdAt;
    }
    get updatedAt() {
        return this.data.updatedAt;
    }
    get deletedAt() {
        return this.data.deletedAt;
    }
    toData() {
        return this.data;
    }
}
exports.BaseEntity = BaseEntity;
