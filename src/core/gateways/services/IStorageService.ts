
export interface IStorageService {

  upload(file: Buffer, fileKey:string, type:any): Promise<string>;


}
