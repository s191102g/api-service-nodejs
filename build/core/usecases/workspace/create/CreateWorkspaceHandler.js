"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWorkspaceHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../utils/validator");
const WorkSpace_1 = require("../../../domain/entities/workspace/WorkSpace");
const MessageError_1 = require("../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../shared/exceptions/SystemError");
const CommandHandler_1 = require("../../../shared/usecase/CommandHandler");
const CreateWorkspaceOutput_1 = require("./CreateWorkspaceOutput");
let CreateWorkspaceHandler = class CreateWorkspaceHandler extends CommandHandler_1.CommandHandler {
    constructor(_workspaceRepository) {
        super();
        this._workspaceRepository = _workspaceRepository;
    }
    async handle(userId, param) {
        await (0, validator_1.validateDataInput)(param);
        const data = new WorkSpace_1.WorkSpace();
        data.userId = userId;
        data.name = param.name;
        data.image = "";
        const isExist = await this._workspaceRepository.checkNameExist(param.name);
        if (isExist) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_EXISTED, "name");
        }
        const member = [userId];
        if (param.member) {
            param.member.forEach((e) => {
                member.push(e);
            });
        }
        data.member = member;
        const created = await this._workspaceRepository.create(data);
        const result = new CreateWorkspaceOutput_1.CreateWorkspaceOutput();
        result.setData(created);
        return result;
    }
};
CreateWorkspaceHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)("workspace.repository")),
    tslib_1.__metadata("design:paramtypes", [Object])
], CreateWorkspaceHandler);
exports.CreateWorkspaceHandler = CreateWorkspaceHandler;
