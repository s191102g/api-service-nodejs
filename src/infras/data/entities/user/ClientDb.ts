import { Column, Entity, Index, OneToMany } from "typeorm";
import { Client } from "../../../../core/domain/entities/user/Client";
import { StatusType } from "../../../../core/domain/enums/user/userEnum";
import { IClient } from "../../../../core/domain/interfaces/user/IClient";
import { IWorkSpace } from "../../../../core/domain/interfaces/workspace/IWorkSpace";
import { CLIENT_SCHEMA } from "../../schemas/user/ClientSchema";
import { WorkSpaceDb } from "../workspace/WorkSpaceDb";
import { UserDb } from "./UserDb";

@Entity(CLIENT_SCHEMA.TABLE_NAME)
export class ClientDb extends UserDb implements IClient {
  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.USER_NAME, length: 50, nullable:true })
  @Index({ unique: true, where: ClientDb.getIndexFilterDeletedColumn() })
  userName: string;
  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.PASS_WORD, length: 50 })
  passWord: string;

  @Column("varchar", { name: CLIENT_SCHEMA.COLUMNS.EMAIL, length: 50 })
  @Index({ unique: true, where: ClientDb.getIndexFilterDeletedColumn() })
  email: string;

  @Column("varchar", {name:CLIENT_SCHEMA.COLUMNS.ACTIVEKEY, length:20, nullable:true})
  @Index()
  activeKey: string;

  @Column("enum",{name: CLIENT_SCHEMA.COLUMNS.STATUS, enum: StatusType, nullable:true})
   status: StatusType;

  /* Relationship */
  @OneToMany(() => WorkSpaceDb, (workspaces) => workspaces.client)
  workSpaces: IWorkSpace[];

  override toEntity(): Client {
    return new Client(this);
  }

  override fromEntity(entity: Client): IClient {
    return entity.toData();
  }
}
