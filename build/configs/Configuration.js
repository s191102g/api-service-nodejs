"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINIO_USE_SSL = exports.MINIO_SECRET_KEY = exports.MINIO_ACCESS_KEY = exports.MINIO_PORT = exports.MINIO_HOST = exports.STORAGE_BUCKET_NAME = exports.STORAGE_UPLOAD_DIR = exports.STORAGE_URL = exports.AWS_SECRET_KEY = exports.AWS_ACCESS_KEY = exports.AWS_BUCKET_REGION = exports.AWS_BUCKET_NAME = exports.API_PORT = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const converter_1 = require("../utils/converter");
dotenv_1.default.config();
exports.API_PORT = process.env.PORT || process.env.API_PORT;
exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME ?? "";
exports.AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
exports.STORAGE_URL = process.env.STORAGE_URL ?? "http://localhost";
exports.STORAGE_UPLOAD_DIR = process.env.STORAGE_UPLOAD_DIR ?? "uploads";
exports.STORAGE_BUCKET_NAME = process.env.STORAGE_BUCKET_NAME ?? "";
exports.MINIO_HOST = process.env.MINIO_HOST ?? "";
exports.MINIO_PORT = process.env.MINIO_PORT
    ? Number(process.env.MINIO_PORT)
    : 0;
exports.MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY ?? "";
exports.MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY ?? "";
exports.MINIO_USE_SSL = (0, converter_1.convertStringToBoolean)(process.env.MINIO_USE_SSL);
