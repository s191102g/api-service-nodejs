
import { Inject } from "typedi";
import { getRepository, QueryRunner, Repository } from "typeorm";
import { IEntity } from "../../../../core/domain/interfaces/base/IEntity";
import { DbPaginationFilter } from "../../../../core/shared/database/DbPaginationFilter";
import { IBaseRepository } from "../../../../core/shared/database/interfaces/IBaseRepository";
import { IDbContext } from "../../../../core/shared/database/interfaces/IDbContext";
import { IDbQueryRunner } from "../../../../core/shared/database/interfaces/IDbQueryRunner";
import { BaseDbEntity } from "../../entities/base/BaseDbEntity";


export abstract class BaseRepository<
  TIdentityType,
  TEntity extends IEntity<TIdentityType>,
  TDbEntity extends BaseDbEntity<TIdentityType, TEntity>
> implements IBaseRepository<TIdentityType, TEntity>
{
  @Inject("db.context")
  protected readonly dbContext: IDbContext;
  protected readonly repository: Repository<TDbEntity>;

  constructor(
    private _type: { new (): TDbEntity },
    private _schema: { TABLE_NAME: string }
  ) {
    this.repository = getRepository(this._type);
  }

  
  async findAndCount(filter: DbPaginationFilter): Promise<[TEntity[], number]> {
    const query = this.repository
      .createQueryBuilder(this._schema.TABLE_NAME)
      .skip(filter.skip)
      .take(filter.limit);

    const [list, count] = await query.getManyAndCount();
    return [list.map((item) => item.toEntity()), count];
  }

  async create(
    data: TEntity,
    queryRunner: IDbQueryRunner | null = null
  ): Promise<TIdentityType> {
    const result = await this.repository
      .createQueryBuilder(this._schema.TABLE_NAME, queryRunner as QueryRunner)
      .insert()
      .values(new this._type().fromEntity(data) as any)
      .execute();
    return result.identifiers[0].id;
  }

  async find(queryRunner: IDbQueryRunner | null = null): Promise<TEntity[]> {
    const result = await this.repository
      .createQueryBuilder(this._schema.TABLE_NAME, queryRunner as QueryRunner)
      .getMany();

    const resultFinal = result.map((e) => e.toEntity());
    return resultFinal;
  }

  async softDelete(
    id: TIdentityType,
    queryRunner: IDbQueryRunner | null = null
  ): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder(this._schema.TABLE_NAME, queryRunner as QueryRunner)
      .softDelete()
      .whereInIds(id)
      .execute();

    return !!result.affected;
  }

  async update(
    id: TIdentityType,
    data: TEntity,
    queryRunner: IDbQueryRunner | null = null
  ): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder(this._schema.TABLE_NAME, queryRunner as QueryRunner)
      .update(new this._type().fromEntity(data) as any)
      .whereInIds(id)
      .execute();
    return !!result.affected;
  }

  async getById(
    id: TIdentityType,
    queryRunner: IDbQueryRunner | null = null
  ): Promise<TEntity | null> {
    const result = await this.repository
      .createQueryBuilder(this._schema.TABLE_NAME, queryRunner as QueryRunner)
      .whereInIds(id)
      .getOne();
    return result ? result.toEntity() : null;
  }
}
