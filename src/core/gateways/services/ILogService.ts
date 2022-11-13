import { Handler } from "express";

export interface ILogService {
  createMiddleware(): Handler;
}
