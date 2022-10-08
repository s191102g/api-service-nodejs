


import { Service } from "typedi";
import { User } from "../../../../core/domain/entities/user/User";
import { IUserRepository } from "../../../../core/gateways/repositories/user/IUserRepository";
import { UserDb } from "../../entities/user/UserDb";
import { USER_SCHEMA } from "../../schemas/user/UserSchema";
import { BaseRepository } from "../base/BaseRepository";





@Service('user.repository')
export class ClientRepository extends BaseRepository<
  string, User, UserDb
> implements IUserRepository {
    constructor(){
        super(UserDb,USER_SCHEMA)
    }

}