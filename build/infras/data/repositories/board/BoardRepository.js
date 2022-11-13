"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardRepository = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const BoardDb_1 = require("../../entities/board/BoardDb");
const BoardSchema_1 = require("../../schemas/board/BoardSchema");
const BaseRepository_1 = require("../base/BaseRepository");
let BoardRepository = class BoardRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(BoardDb_1.BoardDb, BoardSchema_1.BOARD_SCHEMA);
    }
    async getByWorkspaceId(workSpaceId) {
        const query = this.repository
            .createQueryBuilder(BoardSchema_1.BOARD_SCHEMA.TABLE_NAME)
            .where(`${BoardSchema_1.BOARD_SCHEMA.TABLE_NAME}.${BoardSchema_1.BOARD_SCHEMA.COLUMNS.WORKSPACE_ID} =:workSpaceId`, { workSpaceId });
        const result = await query.getMany();
        return result ? result.map((e) => e.toEntity()) : null;
    }
};
BoardRepository = tslib_1.__decorate([
    (0, typedi_1.Service)("board.repository"),
    tslib_1.__metadata("design:paramtypes", [])
], BoardRepository);
exports.BoardRepository = BoardRepository;
