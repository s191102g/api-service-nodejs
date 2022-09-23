
import { getRepository, Repository } from "typeorm";
import { IEntity } from "../../../../core/domain/interfaces/base/IEntity";
import { IBaseRepository } from "../../../../core/shared/database/interfaces/IBaseRepository";
import { BaseDbEntity } from "../../entities/base/BaseDbEntity";





export abstract class BaseRepository<
TIdentityType,
TEntity extends IEntity<TIdentityType>,
TDbEntity extends BaseDbEntity<TIdentityType, TEntity>
> implements IBaseRepository<TIdentityType, TEntity>
{
    protected readonly repository: Repository<TDbEntity>;

  constructor(
    private _type: { new (): TDbEntity },
    private _schema: { TABLE_NAME: string }
  ) {
    this.repository = getRepository(this._type);
  }

  async create(
    data: TEntity,
  ): Promise<TIdentityType> {
    const result = await this.repository
      .createQueryBuilder(this._schema.TABLE_NAME)
      .insert()
      .values(new this._type().fromEntity(data) as any)
      .execute();
    return result.identifiers[0].id;
  }

}