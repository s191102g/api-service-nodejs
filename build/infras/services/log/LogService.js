"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const tslib_1 = require("tslib");
const express_winston_1 = tslib_1.__importDefault(require("express-winston"));
const typedi_1 = require("typedi");
const winston_1 = require("winston");
let LogService = class LogService {
    constructor() {
        this._logger = (0, winston_1.createLogger)({
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
                }),
                new winston_1.transports.File({
                    level: "error",
                    filename: process.cwd() + "/logs/error.log",
                    maxsize: 10485760,
                    maxFiles: 5,
                    format: winston_1.format.combine(winston_1.format.simple()),
                }),
            ],
        });
    }
    createMiddleware() {
        const initLog = express_winston_1.default.logger({
            winstonInstance: this._logger,
            msg: function (req, res) {
                const remoteIp = req.headers["x-forwarded-for"] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress;
                return `[${new Date()}]:___ remoteIp: ${remoteIp} ____ req-med: ${req.method} ____ res-status: ${res.statusCode} ___ UA: ${req.headers["user-agent"]}`;
            },
            ignoreRoute: function (req, _res) {
                if (req.path === "/health" || req.path.startsWith("/docs")) {
                    return true;
                }
                return false;
            },
            statusLevels: true,
            meta: true,
        });
        return (req, res, next) => {
            initLog(req, res, next);
        };
    }
};
LogService = tslib_1.__decorate([
    (0, typedi_1.Service)('log.service')
], LogService);
exports.LogService = LogService;
