"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashMD5 = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Hash data with md5
 */
function hashMD5(content, salt = null) {
    return content
        ? crypto_1.default
            .createHash("md5")
            .update((salt ?? "") + content)
            .digest("hex")
        : "";
}
exports.hashMD5 = hashMD5;
