"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindWorkSpacehandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const QueryHandler_1 = require("../../../shared/usecase/QueryHandler");
const FindWorkspaceOutput_1 = require("./FindWorkspaceOutput");
let FindWorkSpacehandler = class FindWorkSpacehandler extends QueryHandler_1.QueryHandler {
    constructor(_workspaceRepository) {
        super();
        this._workspaceRepository = _workspaceRepository;
    }
    async handle(userId) {
        const list = await this._workspaceRepository.getAll();
        const data = [];
        for (const item of list) {
            if (item.member.includes(userId)) {
                data.push(item);
            }
        }
        const result = new FindWorkspaceOutput_1.FindWorkspaceOutput();
        result.setData(data);
        return result;
    }
};
FindWorkSpacehandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)("workspace.repository")),
    tslib_1.__metadata("design:paramtypes", [Object])
], FindWorkSpacehandler);
exports.FindWorkSpacehandler = FindWorkSpacehandler;
