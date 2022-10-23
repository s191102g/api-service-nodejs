import dotenv from "dotenv"
dotenv.config()

export const API_PORT = process.env.PORT || process.env.API_PORT ;

export const  AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME ?? "";
export const AWS_BUCKET_REGION=process.env.AWS_BUCKET_REGION;
export const AWS_ACCESS_KEY=process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY;
export const STORAGE_UPLOAD_DIR = process.env.STORAGE_UPLOAD_DIR ?? "";