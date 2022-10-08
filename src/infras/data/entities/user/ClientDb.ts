import { Column, Entity } from "typeorm";
import { Client } from "../../../../core/domain/entities/user/Client";
import { IClient } from "../../../../core/domain/interfaces/user/IClient";
import { CLIENT_SCHEMA } from "../../schemas/user/ClientSchema";
import { UserDb } from "./UserDb";

@Entity(CLIENT_SCHEMA.TABLE_NAME)
export class ClientDb extends UserDb implements IClient {
  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.USER_NAME })
  userName: string;
  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.PASS_WORD })
  passWord: string;
  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.EMAIL })
  email: string;

  override toEntity(): Client {
    return new Client(this);
  }

  override fromEntity(entity: Client): IClient {
    return entity.toData();
  }
}
