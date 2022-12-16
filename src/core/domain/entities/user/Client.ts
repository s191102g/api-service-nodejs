import { isString } from "class-validator";
import Container from "typedi";
import { hashMD5 } from "../../../../utils/crypt";
import { ICryptoService } from "../../../gateways/services/ICryptoService";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { Pay, StatusType, TypeUse } from "../../enums/userEnum";
import { IClient } from "../../interfaces/user/IClient";
import { WorkSpace } from "../workspace/WorkSpace";
import { UserBase } from "./User";

export class Client extends UserBase<IClient> implements IClient {
  private _cryptoService = Container.get<ICryptoService>("crypto.service");

  get userName(): string {
    return this._cryptoService.decrypt(this.data.userName);
  }

  set userName(val: string) {
    if (!val) {
      throw new SystemError(MessageError.DATA_INVALID, "username");
    }
    if (!isString(val)) {
      throw new SystemError(MessageError.DATA_INVALID, "username");
    }
    this.data.userName = this._cryptoService.encrypt(val);
  }

  get passWord(): string {
    return this.data.passWord;
  }

  set passWord(val: string) {
    // const regExp =
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()-_=+[{\]}\\|;:'",<.>/?]).{8,20}$/;
    // if (!regExp.test(val)) {
    //   throw new SystemError(
    //     MessageError.PARAM_LEN_AT_LEAST_AND_MAX_SPECIAL,
    //     "password",
    //     8,
    //     20
    //   );
    // }

    this.data.passWord = this._hashPassword(val);
  }

  get email(): string {
    return this._cryptoService.decrypt(this.data.email);
  }

  set email(val: string) {
    this.data.email = this._cryptoService.encrypt(val);
  }  

  get activeKey(): string | null{
       return this.data.activeKey;
  }
  set activeKey(val:string | null){
    this.data.activeKey =val
  }

  get status(): StatusType{
      return this.data.status;
  }
  set status(val : StatusType){
    this.data.status = val
  }

  get typeUse(): TypeUse | null{
     return this.data.typeUse;
  }

  set typeUse(val: TypeUse | null){
    this.data.typeUse = val;
  }

  get pay(): Pay | null{
    return this.data.pay
  }

   
  // relationship
  get workSpaces(): WorkSpace[] {
    return this.data.workSpaces && this.data.workSpaces.map((e) => new WorkSpace(e));
  }

  private _hashPassword(password: string): string {
    return hashMD5(password, "$$");
  }

  comparePassword(password: string): boolean {
    return this.passWord === this._hashPassword(password);
  }
}
