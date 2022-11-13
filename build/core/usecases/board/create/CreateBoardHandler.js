"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBoardHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../utils/validator");
const Board_1 = require("../../../domain/entities/board/Board");
const boardEnum_1 = require("../../../domain/enums/boardEnum");
const MessageError_1 = require("../../../shared/exceptions/message/MessageError");
const SystemError_1 = require("../../../shared/exceptions/SystemError");
const CommandHandler_1 = require("../../../shared/usecase/CommandHandler");
const CreateBoardOutput_1 = require("./CreateBoardOutput");
let CreateBoardHandler = class CreateBoardHandler extends CommandHandler_1.CommandHandler {
    constructor(_boardReposiory) {
        super();
        this._boardReposiory = _boardReposiory;
    }
    async handle(param) {
        await (0, validator_1.validateDataInput)(param);
        const data = new Board_1.Board();
        data.title = param.title;
        data.position = param.position;
        data.description = param.description;
        data.icon = param.icon;
        data.favourite = param.favourite === 'yes' ? boardEnum_1.FavouriteType.Favourite : boardEnum_1.FavouriteType.UnFavourite;
        data.favouritePosition = param.favouritePosition;
        data.workSpaceId = param.workspaceId;
        data.templateId = param.templateId;
        const boards = await this._boardReposiory.getByWorkspaceId(param.workspaceId);
        if (!boards) {
            throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, "workspaceId");
        }
        for (const item of boards) {
            if (item.position == param.position) {
                throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, "position");
            }
            if (param.favourite === 'yes') {
                if (item.favouritePosition == param.favouritePosition) {
                    throw new SystemError_1.SystemError(MessageError_1.MessageError.PARAM_INCORRECT, "favouritePosition");
                }
            }
        }
        const create = await this._boardReposiory.create(data);
        const result = new CreateBoardOutput_1.CreateBoardOutput();
        result.setData(create);
        return result;
    }
};
CreateBoardHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)("board.repository")),
    tslib_1.__metadata("design:paramtypes", [Object])
], CreateBoardHandler);
exports.CreateBoardHandler = CreateBoardHandler;
