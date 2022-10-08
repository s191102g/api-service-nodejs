/* eslint-disable no-console */

import CryptoJS from "crypto-js";
import { Service } from "typedi";
import { ICryptoService } from "../../../core/gateways/services/ICryptoService";

@Service("crypto.service")
export class CryptoService implements ICryptoService  {
  private _secrecKey: CryptoJS.lib.WordArray;
  private _iv: CryptoJS.lib.WordArray;
  constructor() {
    this._secrecKey = CryptoJS.enc.Base64.parse('CRYPTO_SERECT_KEY');
    this._iv = CryptoJS.enc.Base64.parse('CRYPTO_IV');
  }

  encrypt(data: any): string {
    return CryptoJS.AES.encrypt(data, this._secrecKey, {
      iv: this._iv,
    }).toString();
  }

  decrypt(data: string): string {
    try {
      const decrypted = CryptoJS.AES.decrypt(data, this._secrecKey, {
        iv: this._iv,
      });
      if (decrypted.sigBytes < 0) {
        return data;
      }
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      return data;
    }
  }
}
