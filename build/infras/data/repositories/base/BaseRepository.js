"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
class BaseRepository {
    constructor(_type, _schema) {
        this._type = _type;
        this._schema = _schema;
        this.repository = (0, typeorm_1.getRepository)(this._type);
    }
    async create(data, queryRunner = null) {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME, queryRunner)
            .insert()
            .values(new this._type().fromEntity(data))
            .execute();
        return result.identifiers[0].id;
    }
    async find(queryRunner = null) {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME, queryRunner)
            .getMany();
        const resultFinal = result.map((e) => e.toEntity());
        return resultFinal;
    }
    async softDelete(id, queryRunner = null) {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME, queryRunner)
            .softDelete()
            .whereInIds(id)
            .execute();
        return !!result.affected;
    }
    async update(id, data, queryRunner = null) {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME, queryRunner)
            .update(new this._type().fromEntity(data))
            .whereInIds(id)
            .execute();
        return !!result.affected;
    }
    async getById(id, queryRunner = null) {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME, queryRunner)
            .whereInIds(id)
            .getOne();
        return result ? result.toEntity() : null;
    }
}
tslib_1.__decorate([
    (0, typedi_1.Inject)("db.context"),
    tslib_1.__metadata("design:type", Object)
], BaseRepository.prototype, "dbContext", void 0);
exports.BaseRepository = BaseRepository;
