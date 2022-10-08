export interface ICryptoService {
  encrypt(data: string): string;
  decrypt(data: string): string;
}
