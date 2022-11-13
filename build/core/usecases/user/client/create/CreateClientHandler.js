"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../../utils/validator");
const Client_1 = require("../../../../domain/entities/user/Client");
const MessageError_1 = require("../../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../../shared/exceptions/SystemError");
const CommandHandler_1 = require("../../../../shared/usecase/CommandHandler");
const CreateClientOutput_1 = require("./CreateClientOutput");
let CreateClientHandler = class CreateClientHandler extends CommandHandler_1.CommandHandler {
    constructor(_clientRepository, _cryptoService) {
        super();
        this._clientRepository = _clientRepository;
        this._cryptoService = _cryptoService;
    }
    async handle(param) {
        await (0, validator_1.validateDataInput)(param);
        const data = new Client_1.Client();
        data.firstName = param.firstName;
        data.lastName = param.lastName;
        data.passWord = param.password;
        const client = await this._clientRepository.getByEmail(this._cryptoService.encrypt(param.email));
        if (!client) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_NOT_FOUND);
        }
        if (client.activeKey) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_INVALID);
        }
        const idCreated = await this._clientRepository.update(client.id, data);
        const result = new CreateClientOutput_1.CreateClientOutput();
        result.setData(idCreated);
        return result;
    }
};
CreateClientHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)('client.repository')),
    tslib_1.__param(1, (0, typedi_1.Inject)('crypto.service')),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], CreateClientHandler);
exports.CreateClientHandler = CreateClientHandler;
