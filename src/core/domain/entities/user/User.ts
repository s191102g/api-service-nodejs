
import { GenderType, RoleType } from "../../enums/userEnum";
import { IUser } from "../../interfaces/user/IUser";
import { BaseEntity } from "../base/BaseEntyti";

export class UserBase<T extends IUser> extends BaseEntity<string, T> implements IUser {
  get role(): RoleType {
    return this.data.role;
  }

  set role(val: RoleType) {
    this.data.role = val;
  }
  get firstName(): string {
    return this.data.firstName;
  }

  set firstName(val: string) {
    this.data.firstName = val;
  }

  get lastName(): string {
    return this.data.lastName;
  }

  set lastName(val: string) {
    this.data.lastName = val;
  }

  get avatar(): string | null {
    return this.data.avatar;
  }

  set avatar(val: string | null) {
    this.data.avatar = val;
  }

  get gender(): GenderType | null {
    return this.data.gender;
  }

  set gender(val: GenderType | null) {
    this.data.gender = val;
  }

  get birthDay(): Date | null {
    return this.data.birthDay;
  }

  set birthDay(val: Date | null) {
    
    this.data.birthDay = val;
  }
}
export class User extends UserBase<IUser> {}