import { Column, Entity, Index } from "typeorm";
import { Admin } from "../../../../core/domain/entities/user/Admin";
import { IAdmin } from "../../../../core/domain/interfaces/user/IAdmin";
import { ADMIN_SCHEMA } from "../../schemas/user/AdminSchema";
import { UserDb } from "./UserDb";

@Entity(ADMIN_SCHEMA.TABLE_NAME)
export class AdminDb extends UserDb implements IAdmin {
  @Column("varchar", { name: ADMIN_SCHEMA.COLUMNS.USER_NAME, length: 50, nullable:true })
  @Index({ unique: true, where: AdminDb.getIndexFilterDeletedColumn() })
  userName: string;
  @Column("varchar", { name: ADMIN_SCHEMA.COLUMNS.PASS_WORD, length: 50 })
  passWord: string;

  override toEntity(): Admin {
    return new Admin(this);
  }

  override fromEntity(entity: Admin): IAdmin {
    return entity.toData();
  }
}
