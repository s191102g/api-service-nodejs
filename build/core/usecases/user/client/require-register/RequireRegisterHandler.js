"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireRegisterHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../../utils/validator");
const Client_1 = require("../../../../domain/entities/user/Client");
const userEnum_1 = require("../../../../domain/enums/userEnum");
const MessageError_1 = require("../../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../../shared/exceptions/SystemError");
const CommandHandler_1 = require("../../../../shared/usecase/CommandHandler");
const RequireRegisterOutput_1 = require("./RequireRegisterOutput");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
let RequireRegisterHandler = class RequireRegisterHandler extends CommandHandler_1.CommandHandler {
    constructor(_clientRepository, _cryptoServiceL, _mailService) {
        super();
        this._clientRepository = _clientRepository;
        this._cryptoServiceL = _cryptoServiceL;
        this._mailService = _mailService;
    }
    async handle(param) {
        await (0, validator_1.validateDataInput)(param);
        const client = await this._clientRepository.getByEmail(this._cryptoServiceL.encrypt(param.email));
        if (client === null) {
            const data = new Client_1.Client();
            data.email = param.email;
            data.status = userEnum_1.StatusType.InActive;
            const activeKey = crypto_1.default.randomBytes(4).toString("hex");
            data.activeKey = activeKey;
            data.role = userEnum_1.RoleType.Client;
            data.firstName = 'client';
            data.passWord = '1clientC.';
            await this._clientRepository.create(data);
            await this._mailService.sendMailVertify(param.email, data.activeKey);
            const result = new RequireRegisterOutput_1.RequireRegisterOutput();
            result.setData(true);
            return result;
        }
        else {
            if (client.status == userEnum_1.StatusType.InActive && client.email) {
                throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_NOT_ACTIVATED, "email");
            }
            const result = new RequireRegisterOutput_1.RequireRegisterOutput();
            result.setData(false);
            return result;
        }
    }
};
RequireRegisterHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)('client.repository')),
    tslib_1.__param(1, (0, typedi_1.Inject)('crypto.service')),
    tslib_1.__param(2, (0, typedi_1.Inject)("mail.service")),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], RequireRegisterHandler);
exports.RequireRegisterHandler = RequireRegisterHandler;
