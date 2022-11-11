import { IDbQueryRunner } from "./IDbQueryRunner";

export interface IBaseRepository<TIdentityType, TEntity>{
    create(data: TEntity): Promise<TIdentityType>;
    create(
        data: TEntity,
        queryRunner: IDbQueryRunner | null
      ): Promise<TIdentityType>;
    find(): Promise<TEntity[]>;
    softDelete(id:TIdentityType): Promise<boolean>;
    update(id: TIdentityType,data: TEntity,): Promise<boolean>;
    getById(id: TIdentityType): Promise<TEntity | null>
}