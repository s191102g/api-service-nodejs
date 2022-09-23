"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository {
    constructor(_type, _schema) {
        this._type = _type;
        this._schema = _schema;
        this.repository = (0, typeorm_1.getRepository)(this._type);
    }
    async create(data) {
        const result = await this.repository
            .createQueryBuilder(this._schema.TABLE_NAME)
            .insert()
            .values(new this._type().fromEntity(data))
            .execute();
        return result.identifiers[0].id;
    }
}
exports.BaseRepository = BaseRepository;
