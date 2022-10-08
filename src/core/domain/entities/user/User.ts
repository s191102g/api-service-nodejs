
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { GenderType, RoleType } from "../../enums/user/userEnum";
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

  get birthDay(): string | null {
    return this.data.birthDay;
  }

  set birthday(val: string | null) {
    if (val) {
      if (!/(?<year>\d{4})-(?<month>\d{1,2})-(?<day>\d{1,2})/u.test(val)) {
        throw new SystemError(MessageError.PARAM_INVALID, "birthday");
      }

      if (new Date(val) > new Date()) {
        throw new SystemError(MessageError.PARAM_INVALID, "birthday");
      }
    }
    this.data.birthDay = val;
  }
}
export class User extends UserBase<IUser> {}