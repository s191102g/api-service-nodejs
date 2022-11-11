import { Service } from "typedi";
import { Admin } from "../../../../core/domain/entities/user/Admin";
import { IAdminRepository } from "../../../../core/gateways/repositories/user/IAdminRepository";
import { AdminDb } from "../../entities/user/AdminDb";
import { ADMIN_SCHEMA } from "../../schemas/user/AdminSchema";
import { BaseRepository } from "../base/BaseRepository";


@Service('admin.repository')
export class AdminRepository extends BaseRepository<
  string, Admin, AdminDb
> implements IAdminRepository {
    constructor(){
        super(AdminDb,ADMIN_SCHEMA)
    }

    async getByUsername(
      username: string
    ): Promise<Admin | null> {
      const query = this.repository
        .createQueryBuilder(ADMIN_SCHEMA.TABLE_NAME)
        .where(
          `LOWER(${ADMIN_SCHEMA.TABLE_NAME}.${ADMIN_SCHEMA.COLUMNS.USER_NAME}) = LOWER(:username)`,
          { username }
        );
  
      const result = await query.getOne();
      return result ? result.toEntity() : null;
    }
}