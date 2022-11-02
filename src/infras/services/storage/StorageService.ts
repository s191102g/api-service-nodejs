import { Service } from "typedi";
import { IStorageService } from "../../../core/gateways/services/IStorageService";
import * as AWS from 'aws-sdk'
import { AWS_ACCESS_KEY, AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_SECRET_KEY, STORAGE_URL } from "../../../configs/Configuration";

@Service("storage.service")
export class StorageService implements IStorageService {
  private readonly s3
  constructor() {
     this.s3 = new AWS.S3({
      region: AWS_BUCKET_REGION,
      secretAccessKey: AWS_SECRET_KEY,
      accessKeyId: AWS_ACCESS_KEY
     })
  }
  async upload(file: Buffer,fileKey:string, type:any): Promise<string> {
    await this.s3.putObject({
      Key:fileKey,
      Bucket: AWS_BUCKET_NAME,
      Body:file,
      ContentType: type,
    }).promise();

    const data = await this.s3.listObjectsV2({Bucket:AWS_BUCKET_NAME}).promise()
    console.log(data);
    
    return `${STORAGE_URL}/${fileKey}`
  
  }

}
