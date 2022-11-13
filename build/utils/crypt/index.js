"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashMD5 = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
function hashMD5(content, salt = null) {
    return content
        ? crypto_1.default
            .createHash("md5")
            .update((salt ?? "") + content)
            .digest("hex")
        : "";
}
exports.hashMD5 = hashMD5;
