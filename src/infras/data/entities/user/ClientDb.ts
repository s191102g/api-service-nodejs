import { Column, Entity, Index } from "typeorm";
import { Client } from "../../../../core/domain/entities/user/Client";
import { IClient } from "../../../../core/domain/interfaces/user/IClient";
import { CLIENT_SCHEMA } from "../../schemas/user/ClientSchema";
import { UserDb } from "./UserDb";

@Entity(CLIENT_SCHEMA.TABLE_NAME)
export class ClientDb extends UserDb implements IClient {
  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.USER_NAME, length:50 })
  @Index({unique:true , where: ClientDb.getIndexFilterDeletedColumn() })
  userName: string;
  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.PASS_WORD, length:50 })
  passWord: string;
  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.EMAIL, length:50 })
  email: string;

  override toEntity(): Client {
    return new Client(this);
  }

  override fromEntity(entity: Client): IClient {
    return entity.toData();
  }
}