
import { Service } from "typedi";
import { Sang } from "../../../../core/domain/entities/sang/Sang";
import { ISangRepository } from "../../../../core/gateways/repositories/sang/ISangRepository";
import { SangDb } from "../../entities/sang/SangDb";
import { SANG_SCHEMA } from "../../schemas/sang/SangSchema";
import { BaseRepository } from "../base/BaseRepository";


@Service()
export class SangRepository
  extends BaseRepository<string, Sang, SangDb>
  implements ISangRepository
{
  constructor() {
    super(SangDb, SANG_SCHEMA);
  }
}
