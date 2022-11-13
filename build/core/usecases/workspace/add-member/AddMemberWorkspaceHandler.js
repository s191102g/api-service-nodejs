"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMemberWorkspaceHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../utils/validator");
const WorkSpace_1 = require("../../../domain/entities/workspace/WorkSpace");
const MessageError_1 = require("../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../shared/exceptions/SystemError");
const CommandHandler_1 = require("../../../shared/usecase/CommandHandler");
const AddMemberWorkspaceOutput_1 = require("./AddMemberWorkspaceOutput");
let AddMemberWorkspaceHandler = class AddMemberWorkspaceHandler extends CommandHandler_1.CommandHandler {
    constructor(_workspaceRepository, _clientRepository, _cryptoService) {
        super();
        this._workspaceRepository = _workspaceRepository;
        this._clientRepository = _clientRepository;
        this._cryptoService = _cryptoService;
    }
    async handle(idUser, param) {
        await (0, validator_1.validateDataInput)(param);
        const client = await this._clientRepository.getByEmail(this._cryptoService.encrypt(param.emailUser));
        if (!client) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_NOT_FOUND);
        }
        const workspace = await this._workspaceRepository.getByUserAndId(idUser, param.idWorkSpace);
        if (!workspace) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, "workspace");
        }
        if (workspace.member.includes(client.id)) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_EXISTED, "member");
        }
        workspace.member.push(client.id);
        const data = new WorkSpace_1.WorkSpace();
        data.member = workspace.member;
        const hasSuccess = await this._workspaceRepository.update(workspace.id, data);
        const result = new AddMemberWorkspaceOutput_1.AddMemberWorkspaceOutput();
        result.setData(hasSuccess);
        return result;
    }
};
AddMemberWorkspaceHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)("workspace.repository")),
    tslib_1.__param(1, (0, typedi_1.Inject)('client.repository')),
    tslib_1.__param(2, (0, typedi_1.Inject)('crypto.service')),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], AddMemberWorkspaceHandler);
exports.AddMemberWorkspaceHandler = AddMemberWorkspaceHandler;
