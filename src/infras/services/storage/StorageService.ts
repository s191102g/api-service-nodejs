import { Readable } from "stream";
import { Service } from "typedi";
import { MINIO_ACCESS_KEY, MINIO_HOST, MINIO_PORT, MINIO_SECRET_KEY, MINIO_USE_SSL, STORAGE_BUCKET_NAME } from "../../../configs/Configuration";
import { IStorageService, IStorageUploadOption } from "../../../core/gateways/services/IStorageService";
import { IStorageProvider } from "./interfaces/IStorageProvider";
import { MinioFactory } from "./providers/MinioFactory";

@Service("storage.service")
export class StorageService implements IStorageService {
  private readonly _provider: IStorageProvider;

  constructor() {
        this._provider = new MinioFactory(
          MINIO_HOST,
          MINIO_PORT,
          MINIO_USE_SSL,
          MINIO_ACCESS_KEY,
          MINIO_SECRET_KEY
        )
  }

  async createBucket(policy: string): Promise<void> {
    const isExist = await this._provider.checkBucketExist(STORAGE_BUCKET_NAME);
    if (!isExist) {
      await this._provider.createBucket(STORAGE_BUCKET_NAME);
      await this._provider.setBucketPolicy(STORAGE_BUCKET_NAME, policy);
    }
  }

  async checkBucketExist(bucketName: string): Promise<boolean> {
    return this._provider.checkBucketExist(bucketName);
  }

  mapUrl(urlPath: string): string {
    return this._provider.mapUrl(STORAGE_BUCKET_NAME, urlPath);
  }

  async upload(
    urlPath: string,
    stream: string | Readable | Buffer,
    options: IStorageUploadOption | null = null
  ): Promise<boolean> {
    return await this._provider.upload(
      STORAGE_BUCKET_NAME,
      urlPath,
      stream as any,
      options as any
    );
  }

  async download(urlPath: string): Promise<Buffer> {
    return await this._provider.download(STORAGE_BUCKET_NAME, urlPath);
  }

  async delete(urlPath: string): Promise<boolean> {
    return await this._provider.delete(STORAGE_BUCKET_NAME, urlPath);
  }

  async setPolicy(policy: string): Promise<void> {
    await this._provider.setBucketPolicy(STORAGE_BUCKET_NAME, policy);
  }

  async deletePolicy(): Promise<void> {
    await this._provider.deleteBucketPolicy(STORAGE_BUCKET_NAME);
  }
}
