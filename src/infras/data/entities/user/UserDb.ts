import { Column, Entity, Index } from "typeorm";
import { User } from "../../../../core/domain/entities/user/User";
import {
  GenderType,
  RoleType,
} from "../../../../core/domain/enums/userEnum";
import { IUser } from "../../../../core/domain/interfaces/user/IUser";
import { USER_SCHEMA } from "../../schemas/user/UserSchema";
import { BaseDbEntity } from "../base/BaseDbEntity";

@Entity(USER_SCHEMA.TABLE_NAME)
export class UserDb extends BaseDbEntity<string, User> implements IUser {
  @Column("varchar", { name: USER_SCHEMA.COLUMNS.ROLE, length: 10 })
  @Index()
  role: RoleType;

  @Column("varchar", { name: USER_SCHEMA.COLUMNS.FIRST_NAME, length: 50 })
  firstName: string;

  @Column("varchar", {
    name: USER_SCHEMA.COLUMNS.LAST_NAME,
    nullable: true,
    length: 50,
  })
  lastName: string;

  @Column("varchar", {
    name: USER_SCHEMA.COLUMNS.AVATAR,
    length: 1000,
    nullable: true,
  })
  avatar: string | null;

  @Column("varchar", {
    name: USER_SCHEMA.COLUMNS.GENDER,
    length: 6,
    nullable: true,
  })
  gender: GenderType | null;

  @Column("date", { name: USER_SCHEMA.COLUMNS.BIRTHDAY, nullable: true })
  birthDay: Date | null;

  /* Relationship */

  /* Handlers */

  toEntity(): User {
    return new User(this);
  }

  fromEntity(entity: User): IUser {
    return entity.toData();
  }
}
