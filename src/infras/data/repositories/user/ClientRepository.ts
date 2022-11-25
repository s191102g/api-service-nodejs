import { Service } from "typedi";
import { Client } from "../../../../core/domain/entities/user/Client";
import { FindAllClientFilter, IClientRepository } from "../../../../core/gateways/repositories/user/IClientRepository";
import { ClientDb } from "../../entities/user/ClientDb";
import { CLIENT_SCHEMA } from "../../schemas/user/ClientSchema";
import { BaseRepository } from "../base/BaseRepository";


@Service('client.repository')
export class ClientRepository extends BaseRepository<
  string, Client, ClientDb
> implements IClientRepository {
    constructor(){
        super(ClientDb,CLIENT_SCHEMA)
    }
    
    override async findAndCount(
      param: FindAllClientFilter
    ): Promise<[Client[], number]> {
      let query = this.repository.createQueryBuilder(CLIENT_SCHEMA.TABLE_NAME);
  
      if (param.keyword) {
        const keyword = `%${param.keyword}%`;
        query = query.andWhere(
          `${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.FIRST_NAME} ILIKE :keyword`,
          { keyword }
        );
      }
  
      query = query.skip(param.skip).take(param.limit);
  
      const [list, count] = await query.getManyAndCount();
      return [list.map((item) => item.toEntity()), count];
    }

    async CheckUserExist(param: string): Promise<boolean> {
        const result = await this.repository
          .createQueryBuilder(CLIENT_SCHEMA.TABLE_NAME)
          .where(
            `LOWER(${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.EMAIL}) = LOWER(:email)`,
            { email:param }
          )
          .getOne();
        return !!result;
      }

      async getByEmail(
        email: string
      ): Promise<Client | null> {
        const query = this.repository
          .createQueryBuilder(CLIENT_SCHEMA.TABLE_NAME)
          .where(
            `LOWER(${CLIENT_SCHEMA.TABLE_NAME}.${CLIENT_SCHEMA.COLUMNS.EMAIL}) = LOWER(:email)`,
            { email }
          );
    
        const result = await query.getOne();
        return result ? result.toEntity() : null;
      }
}