import dotenv from "dotenv"
import { convertStringToBoolean } from "../utils/converter";
dotenv.config()

export const API_PORT = process.env.PORT || process.env.API_PORT ;

export const  AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME ?? "";
export const AWS_BUCKET_REGION=process.env.AWS_BUCKET_REGION;
export const AWS_ACCESS_KEY=process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY;




export const STORAGE_URL: string = process.env.STORAGE_URL ?? "http://localhost";
export const STORAGE_UPLOAD_DIR: string = process.env.STORAGE_UPLOAD_DIR ?? "uploads";
export const STORAGE_BUCKET_NAME: string =
  process.env.STORAGE_BUCKET_NAME ?? "";

export const MINIO_HOST: string = process.env.MINIO_HOST ?? "";
export const MINIO_PORT: number = process.env.MINIO_PORT
  ? Number(process.env.MINIO_PORT)
  : 0;
export const MINIO_ACCESS_KEY: string = process.env.MINIO_ACCESS_KEY ?? "";
export const MINIO_SECRET_KEY: string = process.env.MINIO_SECRET_KEY ?? "";
export const MINIO_USE_SSL: boolean = convertStringToBoolean(
  process.env.MINIO_USE_SSL
);

export const MODE=process.env.MODE ?? "";
export const CLIENT_ID=process.env.CLIENT_ID ?? "";
export const CLIENT_SECRET=process.env.CLIENT_SECRET ?? "";
