import { Service } from "typedi";
import { Client } from "../../../../core/domain/entities/user/Client";
import { IClientRepository } from "../../../../core/gateways/repositories/user/IClientRepository";
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