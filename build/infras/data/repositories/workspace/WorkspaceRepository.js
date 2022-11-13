"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceRepository = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const WorkSpaceDb_1 = require("../../entities/workspace/WorkSpaceDb");
const BoardSchema_1 = require("../../schemas/board/BoardSchema");
const WorkSpaceSchema_1 = require("../../schemas/workspace/WorkSpaceSchema");
const BaseRepository_1 = require("../base/BaseRepository");
let WorkspaceRepository = class WorkspaceRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(WorkSpaceDb_1.WorkSpaceDb, WorkSpaceSchema_1.WORKSPACE_SCHEMA);
    }
    async findByUser(userId) {
        const query = this.repository
            .createQueryBuilder(WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME)
            .where(`${WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME}.${WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.USER_ID} = :userId `, { userId });
        const result = await query.getMany();
        return result.map((e) => e.toEntity());
    }
    async checkNameExist(name) {
        let query = this.repository
            .createQueryBuilder(WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME)
            .where(`lower(${WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME}.${WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.NAME}) = lower(:name)`, { name });
        const result = await query.getOne();
        return !!result;
    }
    async getAll() {
        let query = this.repository
            .createQueryBuilder(WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME)
            .leftJoinAndSelect(`${WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME}.${WorkSpaceSchema_1.WORKSPACE_SCHEMA.RELATED_MANY.BOARD}`, `${BoardSchema_1.BOARD_SCHEMA.TABLE_NAME}`);
        const result = await query.getMany();
        return result.map((e) => e.toEntity());
    }
    async getByUserAndId(idUser, idWorkspace) {
        let query = this.repository
            .createQueryBuilder(WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME)
            .where(`${WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME}.${WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.USER_ID} = :idUser `, { idUser })
            .andWhere(`${WorkSpaceSchema_1.WORKSPACE_SCHEMA.TABLE_NAME}.${WorkSpaceSchema_1.WORKSPACE_SCHEMA.COLUMNS.ID} = :idWorkspace`, { idWorkspace });
        const result = await query.getOne();
        return result ? result.toEntity() : null;
    }
};
WorkspaceRepository = tslib_1.__decorate([
    (0, typedi_1.Service)("workspace.repository"),
    tslib_1.__metadata("design:paramtypes", [])
], WorkspaceRepository);
exports.WorkspaceRepository = WorkspaceRepository;
