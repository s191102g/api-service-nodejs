

export interface IStorageService{
    uploadFile(file:any, fileKey:string): Promise<any>;
    getFile(imageKey:string): Promise<Object>;
}