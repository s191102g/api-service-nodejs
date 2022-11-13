"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveClientHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../../utils/validator");
const Client_1 = require("../../../../domain/entities/user/Client");
const userEnum_1 = require("../../../../domain/enums/userEnum");
const MessageError_1 = require("../../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../../shared/exceptions/SystemError");
const CommandHandler_1 = require("../../../../shared/usecase/CommandHandler");
const ActiveClientOutput_1 = require("./ActiveClientOutput");
let ActiveClientHandler = class ActiveClientHandler extends CommandHandler_1.CommandHandler {
    constructor(_clientRepository, _cryptoServiceL) {
        super();
        this._clientRepository = _clientRepository;
        this._cryptoServiceL = _cryptoServiceL;
    }
    async handle(param) {
        await (0, validator_1.validateDataInput)(param);
        const client = await this._clientRepository.getByEmail(this._cryptoServiceL.encrypt(param.email));
        if (!client) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_NOT_FOUND);
        }
        if (client.activeKey !== param.activeKey) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, " activeKey");
        }
        const data = new Client_1.Client();
        data.activeKey = null;
        data.status = userEnum_1.StatusType.Active;
        const updated = await this._clientRepository.update(client.id, data);
        const result = new ActiveClientOutput_1.ActiveClientOutput();
        result.setData(updated);
        return result;
    }
};
ActiveClientHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)('client.repository')),
    tslib_1.__param(1, (0, typedi_1.Inject)('crypto.service')),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], ActiveClientHandler);
exports.ActiveClientHandler = ActiveClientHandler;
