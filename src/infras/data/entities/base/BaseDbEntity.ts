
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IEntity } from "../../../../core/domain/interfaces/base/IEntity";
import { BASE_SCHEMA } from "../../schemas/base/BaseSchema";



export abstract class BaseDbEntity<
  TIdentityType,
  TEntity extends IEntity<TIdentityType>
> {
  @PrimaryGeneratedColumn("uuid", { name: BASE_SCHEMA.COLUMNS.ID })
  id: string;

  @CreateDateColumn({
    name: BASE_SCHEMA.COLUMNS.CREATED_AT,
    type: "timestamptz",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: BASE_SCHEMA.COLUMNS.UPDATED_AT,
    type: "timestamptz",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: BASE_SCHEMA.COLUMNS.DELETED_AT,
    type: "timestamptz",
    nullable: true,
  })
  deletedAt: Date | null;

  /* Handlers */

  abstract toEntity(): TEntity;
  abstract fromEntity(entity: TEntity): IEntity<TIdentityType>;

  static getIndexFilterDeletedColumn(): string {
    return `${BASE_SCHEMA.COLUMNS.DELETED_AT} IS NULL`;
  }
}
