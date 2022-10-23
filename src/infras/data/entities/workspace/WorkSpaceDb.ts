import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { WorkSpace } from "../../../../core/domain/entities/workspace/WorkSpace";
import { IBoard } from "../../../../core/domain/interfaces/board/IBoard";
import { IClient } from "../../../../core/domain/interfaces/user/IClient";
import { IWorkSpace } from "../../../../core/domain/interfaces/workspace/IWorkSpace";
import { WORKSPACE_SCHEMA } from "../../schemas/workspace/WorkSpaceSchema";
import { BaseDbEntity } from "../base/BaseDbEntity";
import { BoardDb } from "../board/BoardDb";
import { ClientDb } from "../user/ClientDb";

@Entity(WORKSPACE_SCHEMA.TABLE_NAME)
export class WorkSpaceDb
  extends BaseDbEntity<string, WorkSpace>
  implements IWorkSpace
{
  @Column("varchar",{name:WORKSPACE_SCHEMA.COLUMNS.NAME, length:200})
  @Index()
  name: string;
  
  @Column("varchar", { name: WORKSPACE_SCHEMA.COLUMNS.IMAGE, length: 200 })
  image: string;
  @Column("jsonb", { name: WORKSPACE_SCHEMA.COLUMNS.MEMBER })
  member: any[];

  @Column("uuid", { name: WORKSPACE_SCHEMA.COLUMNS.USER_ID })
  @Index({ where: WorkSpaceDb.getIndexFilterDeletedColumn() })
  userId: string;
  /* Relationship */
  @ManyToOne(() => ClientDb, (client) => client.workSpaces)
  @JoinColumn({ name: WORKSPACE_SCHEMA.COLUMNS.USER_ID })
  client: IClient;

  @OneToMany(()=>BoardDb, (board)=>board.workSpace)
  board: IBoard[];

  toEntity(): WorkSpace {
    return new WorkSpace(this);
  }
  fromEntity(entity: WorkSpace): IWorkSpace {
    return entity.toData();
  }
}
