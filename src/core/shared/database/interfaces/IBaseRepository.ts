
export interface IBaseRepository<TIdentityType, TEntity>{
    create(data: TEntity): Promise<TIdentityType>;
}