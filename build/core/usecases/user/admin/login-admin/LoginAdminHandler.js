"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAdminHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../../utils/validator");
const userEnum_1 = require("../../../../domain/enums/userEnum");
const MessageError_1 = require("../../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../../shared/exceptions/SystemError");
const QueryHandler_1 = require("../../../../shared/usecase/QueryHandler");
const LoginAdminOutput_1 = require("./LoginAdminOutput");
let LoginAdminHandler = class LoginAdminHandler extends QueryHandler_1.QueryHandler {
    constructor(_adminRepository, _authJwtService, _cryptoService) {
        super();
        this._adminRepository = _adminRepository;
        this._authJwtService = _authJwtService;
        this._cryptoService = _cryptoService;
    }
    async handle(param) {
        await (0, validator_1.validateDataInput)(param);
        const admin = await this._adminRepository.getByUsername(this._cryptoService.encrypt(param.username));
        if (!admin) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, "username");
        }
        if (!admin.comparePassword(param.password)) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, "password");
        }
        if (admin.role !== userEnum_1.RoleType.Admin) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_INVALID, "account");
        }
        const token = this._authJwtService.sign(admin.id, admin.role);
        const result = new LoginAdminOutput_1.LoginAdminOutput();
        result.setData(token);
        return result;
    }
};
LoginAdminHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)('admin.repository')),
    tslib_1.__param(1, (0, typedi_1.Inject)("auth_jwt.service")),
    tslib_1.__param(2, (0, typedi_1.Inject)("crypto.service")),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], LoginAdminHandler);
exports.LoginAdminHandler = LoginAdminHandler;
