"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAuthenticator = void 0;
const tslib_1 = require("tslib");
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const UnauthorizedError_1 = require("../../core/shared/exceptions/UnauthorizedError");
const GetAuthByJwtHandler_1 = require("../../core/usecases/user/getAuthByJwt/GetAuthByJwtHandler");
const AccessDeniedError_1 = require("../../core/shared/exceptions/AccessDeniedError");
const UserAuthenticated_1 = require("../../core/shared/UserAuthenticated");
class ApiAuthenticator {
}
exports.ApiAuthenticator = ApiAuthenticator;
_a = ApiAuthenticator;
ApiAuthenticator.authorizationChecker = async (action, role) => {
    const reqExt = action.request;
    const authJwtService = typedi_1.default.get("auth_jwt.service");
    const token = authJwtService.getTokenFromHeader(reqExt.headers);
    if (!token) {
        throw new UnauthorizedError_1.UnauthorizedError();
    }
    const getAuthByJwtQueryHandler = typedi_1.default.get(GetAuthByJwtHandler_1.GetAuthByJwtQueryHandler);
    const { data } = await getAuthByJwtQueryHandler.handle(token);
    if (role &&
        role.length &&
        !role.some((role) => data && role === data.role)) {
        throw new AccessDeniedError_1.AccessDeniedError();
    }
    reqExt.userAuth = new UserAuthenticated_1.UserAuthenticated(data.userId, data.role);
    return true;
};
ApiAuthenticator.currentUserChecker = (action) => {
    const reqExt = action.request;
    return reqExt.userAuth;
};
