
export interface IBaseRepository<TIdentityType, TEntity>{
    create(data: TEntity): Promise<TIdentityType>;
    find(): Promise<TEntity[]>;
    softDelete(id:TIdentityType): Promise<boolean>;
}