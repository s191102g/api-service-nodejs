

import { Column, Entity} from "typeorm";
import { Sang } from "../../../../core/domain/entities/sang/Sang";
import { ISang } from "../../../../core/domain/interfaces/sang/ISang";
import { SANG_SCHEMA } from "../../schemas/sang/SangSchema";
import { BaseDbEntity } from "../base/BaseDbEntity";





@Entity(SANG_SCHEMA.TABLE_NAME)
export class SangDb extends BaseDbEntity<string, Sang> implements ISang{
   

    @Column("varchar", { name: SANG_SCHEMA.COLUMNS.NAME, length: 50 })
    name: string;
    
    toEntity(): Sang {
        return new Sang(this);
    }
    fromEntity(entity: Sang): ISang {
        return entity.toData();
    }
}
