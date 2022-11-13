"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginClientHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../../utils/validator");
const userEnum_1 = require("../../../../domain/enums/userEnum");
const MessageError_1 = require("../../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../../shared/exceptions/SystemError");
const CommandHandler_1 = require("../../../../shared/usecase/CommandHandler");
const LoginClientOutput_1 = require("./LoginClientOutput");
let LoginClientHandler = class LoginClientHandler extends CommandHandler_1.CommandHandler {
    constructor(_clientRepository, _authJwtService, _cryptoService) {
        super();
        this._clientRepository = _clientRepository;
        this._authJwtService = _authJwtService;
        this._cryptoService = _cryptoService;
    }
    async handle(param) {
        await (0, validator_1.validateDataInput)(param);
        const user = await this._clientRepository.getByEmail(this._cryptoService.encrypt(param.email));
        if (user == null) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, "username");
        }
        if (!user.comparePassword(param.password)) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, "password");
        }
        if (user.status !== userEnum_1.StatusType.Active) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.UNAUTHORIZED, "account");
        }
        if (user.role !== userEnum_1.RoleType.Client) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_INVALID, "account");
        }
        const token = this._authJwtService.sign(user.id, user.role);
        const result = new LoginClientOutput_1.LoginClientOutput();
        result.setData(token);
        return result;
    }
};
LoginClientHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)('client.repository')),
    tslib_1.__param(1, (0, typedi_1.Inject)("auth_jwt.service")),
    tslib_1.__param(2, (0, typedi_1.Inject)("crypto.service")),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], LoginClientHandler);
exports.LoginClientHandler = LoginClientHandler;
