"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_USER = exports.DB_PASS = exports.DB_PORT = exports.DB_HOST = exports.DB_NAME = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_NAME = process.env.DB_NAME;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_PORT = Number(process.env.DB_PORT);
exports.DB_PASS = process.env.DB_PASS;
exports.DB_USER = process.env.DB_USER;
