import Container from "typedi";
import { hashMD5 } from "../../../../utils/crypt";
import { ICryptoService } from "../../../gateways/services/ICryptoService";
import { IAdmin } from "../../interfaces/user/IAdmin";
import { UserBase } from "./User";

export class Admin extends UserBase<IAdmin> implements IAdmin {
  private _cryptoService = Container.get<ICryptoService>("crypto.service");

  get userName(): string {
    return this._cryptoService.decrypt(this.data.userName);
  }

  set userName(val: string) {
    this.data.userName = this._cryptoService.encrypt(val);
  }

  get passWord(): string {
    return this.data.passWord;
  }

  set passWord(val: string) {
    this.data.passWord = this._hashPassword(val);
  }

   
  // relationship

  private _hashPassword(password: string): string {
    return hashMD5(password, "$$");
  }

  comparePassword(password: string): boolean {
    return this.passWord === this._hashPassword(password);
  }
}
