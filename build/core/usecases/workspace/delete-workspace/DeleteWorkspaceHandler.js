"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteWorkspaceHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const MessageError_1 = require("../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../shared/exceptions/SystemError");
const CommandHandler_1 = require("../../../shared/usecase/CommandHandler");
const DeleteWorkspaceOutput_1 = require("./DeleteWorkspaceOutput");
let DeleteWorkspaceHandler = class DeleteWorkspaceHandler extends CommandHandler_1.CommandHandler {
    constructor(_workspaceRepository) {
        super();
        this._workspaceRepository = _workspaceRepository;
    }
    async handle(param) {
        const workspace = await this._workspaceRepository.getById(param.id);
        if (!workspace) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_NOT_FOUND);
        }
        if (workspace.userId != param.userId) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_CANNOT_DELETE);
        }
        const success = await this._workspaceRepository.softDelete(param.id);
        const result = new DeleteWorkspaceOutput_1.DeleteWorkspaceOutput();
        result.setData(success);
        return result;
    }
};
DeleteWorkspaceHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)("workspace.repository")),
    tslib_1.__metadata("design:paramtypes", [Object])
], DeleteWorkspaceHandler);
exports.DeleteWorkspaceHandler = DeleteWorkspaceHandler;
