import "reflect-metadata";
import express from "express";
import path from "path";
import { RoutingControllersOptions } from "routing-controllers";
import { ApiDocument } from "./ApiDocument";
import swaggerUiExpress from "swagger-ui-express";
import Container from "typedi";
import { ILogService } from "../../core/gateways/services/ILogService";
import { HttpServer } from "../servers/HttpServer";
import { Server } from "http";
import { ApiAuthenticator } from "./ApiAuthenticator";
export class ApiService {
  static init(port: number, callback?: () => void): Server {
    const app = express();
    const logger = Container.get<ILogService>("log.service");
    app.get("/", (_req, res) => {
      res.status(200).end("ok");
    });

    const loggingMiddleware = logger.createMiddleware();
    app.use(loggingMiddleware);
    const options = this.getOptions({
      controllers: [path.join(__dirname + "/controllers/**/*{.js,.ts}")],
      middlewares: [path.join(__dirname, "./middlewares/*Middleware{.js,.ts}")],
      validation: false,
      development: !!(process.env.NODE_ENV != "production"),
    });
    const httpServer = new HttpServer();
    httpServer.createApp(app, options);
    const spec = ApiDocument.generate(options);
    app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
    return httpServer.start(port, callback);
  }

  static getOptions(param: {
    controllers?: string[] | Function[];
    middlewares?: string[] | Function[];
    validation: boolean;
    development: boolean;
  }): RoutingControllersOptions {
    return {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: [
          "Origin",
          "Content-Type",
          "Accept",
          "Authorization",
          "X-Trace",
        ],
        preflightContinue: true,
        optionsSuccessStatus: 204,
      },
      routePrefix: "/api",
      controllers: param.controllers,
      middlewares: param.middlewares,
      validation: param.validation,
      development: param.development,
      authorizationChecker: ApiAuthenticator.authorizationChecker,
      currentUserChecker: ApiAuthenticator.currentUserChecker,
    };
  }
}
