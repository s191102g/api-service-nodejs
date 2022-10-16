import { Handler,NextFunction, Request, Response } from "express";
import expressWinston from "express-winston";
import { Service } from "typedi";
import { Logger ,createLogger,transports, format} from "winston";
import { ILogService } from "../../../core/gateways/services/ILogService";




@Service('log.service')
export class LogService implements ILogService {
    private readonly _logger: Logger =  createLogger({
        
        transports: [
          new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
          }),
          new transports.File({
            level: "error",
            filename: process.cwd() + "/logs/error.log",
            maxsize: 10485760,
            maxFiles: 5,
            format: format.combine(format.simple()),
          }),
        ],
      });


    createMiddleware(): Handler{
       const initLog = expressWinston.logger({
           winstonInstance: this._logger,
           msg: function (req, res) {
            const remoteIp =
              req.headers["x-forwarded-for"] ||
              req.connection.remoteAddress ||
              req.socket.remoteAddress;
            return `[${new Date()}]:___ remoteIp: ${remoteIp} ____ req-med: ${req.method} ____ res-status: ${res.statusCode} ___ UA: ${req.headers["user-agent"]}`
           },
           ignoreRoute: function (req, _res) {
            if (req.path === "/health" || req.path.startsWith("/docs")) {
              return true;
            }
            return false;
          },
           statusLevels: true,
           meta: true,
       })

       return (req: Request, res: Response, next: NextFunction) => {
        initLog(req, res, next);
      };
    }


  
}