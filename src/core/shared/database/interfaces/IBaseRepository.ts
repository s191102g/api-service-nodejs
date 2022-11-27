import { IDbPaginationFilter } from "./IDbPaginationFilter";
import { IDbQueryRunner } from "./IDbQueryRunner";

export interface IBaseRepository<TIdentityType, TEntity>{
  findAndCount(param: IDbPaginationFilter): Promise<[TEntity[], number]>;
    create(data: TEntity): Promise<TIdentityType>;
    create(
        data: TEntity,
        queryRunner: IDbQueryRunner | null
      ): Promise<TIdentityType>;
    find(): Promise<TEntity[]>;
    softDelete(id:TIdentityType): Promise<boolean>;
    update(id: TIdentityType,data: TEntity,): Promise<boolean>;
    update(
      id: TIdentityType,
      data: TEntity,
      queryRunner: IDbQueryRunner | null
    ): Promise<boolean>;
    getById(id: TIdentityType): Promise<TEntity | null>;
    getById(
      id: TIdentityType,
      queryRunner: IDbQueryRunner | null
    ): Promise<TEntity | null>;
}