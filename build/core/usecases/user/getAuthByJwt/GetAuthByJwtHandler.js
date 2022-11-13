"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAuthByJwtQueryHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const MessageError_1 = require("../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../shared/exceptions/SystemError");
const UnauthorizedError_1 = require("../../../shared/exceptions/UnauthorizedError");
const QueryHandler_1 = require("../../../shared/usecase/QueryHandler");
const GetAuthByJwtOutput_1 = require("./GetAuthByJwtOutput");
let GetAuthByJwtQueryHandler = class GetAuthByJwtQueryHandler extends QueryHandler_1.QueryHandler {
    constructor(_authJwtService) {
        super();
        this._authJwtService = _authJwtService;
    }
    async handle(token) {
        if (!token) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_REQUIRED, "token");
        }
        let payload;
        try {
            payload = this._authJwtService.verify(token);
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new UnauthorizedError_1.UnauthorizedError(MessageError_1.MessageError.PARAM_EXPIRED, "token");
            }
            else {
                throw new UnauthorizedError_1.UnauthorizedError(MessageError_1.MessageError.PARAM_INVALID, "token");
            }
        }
        if (!payload || !payload.sub || !payload.role) {
            throw new UnauthorizedError_1.UnauthorizedError(MessageError_1.MessageError.PARAM_INVALID, "token payload");
        }
        const result = new GetAuthByJwtOutput_1.GetUserAuthByJwtQueryOutput();
        result.setData({
            userId: payload.sub,
            role: payload.role,
        });
        return result;
    }
};
GetAuthByJwtQueryHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)("auth_jwt.service")),
    tslib_1.__metadata("design:paramtypes", [Object])
], GetAuthByJwtQueryHandler);
exports.GetAuthByJwtQueryHandler = GetAuthByJwtQueryHandler;
