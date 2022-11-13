"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBoardByIdHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const MessageError_1 = require("../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../shared/exceptions/SystemError");
const QueryHandler_1 = require("../../../shared/usecase/QueryHandler");
const GetBroadByIdOutput_1 = require("./GetBroadByIdOutput");
let GetBoardByIdHandler = class GetBoardByIdHandler extends QueryHandler_1.QueryHandler {
    constructor(_broadRepository) {
        super();
        this._broadRepository = _broadRepository;
    }
    async handle(id) {
        const data = await this._broadRepository.getById(id);
        if (!data) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.DATA_NOT_FOUND);
        }
        const result = new GetBroadByIdOutput_1.GetBoardByIdOutput();
        result.setData(data);
        return result;
    }
};
GetBoardByIdHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)('board.repository')),
    tslib_1.__metadata("design:paramtypes", [Object])
], GetBoardByIdHandler);
exports.GetBoardByIdHandler = GetBoardByIdHandler;
