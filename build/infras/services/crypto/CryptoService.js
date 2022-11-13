"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const tslib_1 = require("tslib");
const crypto_js_1 = tslib_1.__importDefault(require("crypto-js"));
const typedi_1 = require("typedi");
let CryptoService = class CryptoService {
    constructor() {
        this._secrecKey = crypto_js_1.default.enc.Base64.parse('CRYPTO_SERECT_KEY');
        this._iv = crypto_js_1.default.enc.Base64.parse('CRYPTO_IV');
    }
    encrypt(data) {
        return crypto_js_1.default.AES.encrypt(data, this._secrecKey, {
            iv: this._iv,
        }).toString();
    }
    decrypt(data) {
        try {
            const decrypted = crypto_js_1.default.AES.decrypt(data, this._secrecKey, {
                iv: this._iv,
            });
            if (decrypted.sigBytes < 0) {
                return data;
            }
            return decrypted.toString(crypto_js_1.default.enc.Utf8);
        }
        catch (error) {
            return data;
        }
    }
};
CryptoService = tslib_1.__decorate([
    (0, typedi_1.Service)("crypto.service"),
    tslib_1.__metadata("design:paramtypes", [])
], CryptoService);
exports.CryptoService = CryptoService;
