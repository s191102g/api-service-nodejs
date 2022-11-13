"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwtService = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const typedi_1 = require("typedi");
let AuthJwtService = class AuthJwtService {
    getTokenFromHeader(headers) {
        let token = "";
        if (headers.authorization) {
            const parts = headers.authorization.split(" ");
            token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : "";
        }
        return token;
    }
    sign(userId, role) {
        return jsonwebtoken_1.default.sign({
            userId,
            role,
        }, 'AUTH_SECRET_OR_PRIVATE_KEY', {
            subject: userId,
            expiresIn: 24 * 60 * 60,
            issuer: 'tt',
            audience: `33`
        });
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, 'AUTH_SECRET_OR_PRIVATE_KEY', {
            issuer: 'tt',
            audience: `33`
        });
    }
};
AuthJwtService = tslib_1.__decorate([
    (0, typedi_1.Service)('auth_jwt.service')
], AuthJwtService);
exports.AuthJwtService = AuthJwtService;
