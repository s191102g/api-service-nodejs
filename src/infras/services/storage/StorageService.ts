// import { Service } from "typedi";
// import { IStorageService } from "../../../core/gateways/services/IStorageService";
// import { S3 } from "aws-sdk";
// import { AWS_ACCESS_KEY, AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_SECRET_KEY } from "../../../configs/Configuration";
// import * as fs from "fs";

// @Service("storage.service")
// export class StorageService implements IStorageService{
//     private readonly _s3: S3;
//     private readonly bucketName = AWS_BUCKET_NAME;
//     constructor(){
//        this._s3 = new S3({
//         region : AWS_BUCKET_REGION,
//         accessKeyId : AWS_ACCESS_KEY,
//         secretAccessKey : AWS_SECRET_KEY
//        })
//     }
    
//     async uploadFile(file: any, fileKey:string): Promise<any> {
      
//         const fileStream = fs.createReadStream(file.path)
//         const uploadParams = {
//             Bucket: this.bucketName,
//             Body: fileStream,
//             Key: fileKey,

//           }
        
//          const upload = await this._s3.upload(uploadParams).promise();
//          return upload
//     }





//     async getFile(imageKey: string): Promise<Object> {
//         const downloadParams = {
//             Key: imageKey,
//             Bucket: this.bucketName,
//             Expires:120
//           }
        
//           const filename = this._s3.getSignedUrl('getObject ',downloadParams);

//           return filename
//     }
     
// }