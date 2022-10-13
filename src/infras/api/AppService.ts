

import 'reflect-metadata';
import express from "express";
import path from "path";
import { RoutingControllersOptions, useExpressServer } from "routing-controllers";
import { ApiDocument } from './ApiDocument';
import swaggerUiExpress from "swagger-ui-express";
export class ApiService {
  static init(port: string | undefined) {
    const app = express();
     
    app.get("/test", (_req, res) => {
      res.status(200).end("ok");
    });


    const options = this.getOptions({
      controllers: [path.join(__dirname + '/controllers/**/*{.js,.ts}')],
      middlewares: [path.join(__dirname, "./middlewares/*Middleware{.js,.ts}")],
      validation: false
    });

    useExpressServer(app, options);
    const spec = ApiDocument.generate(options);
    app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
    app.listen(port); 
  }
 

  static getOptions(param: {
    controllers?: string[] | Function[];
    middlewares?: string[] | Function[];
    interceptors?: string[] | Function[];
    validation: boolean;
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
      defaultErrorHandler: false,
      // authorizationChecker: ApiAuthenticator.authorizationChecker,
      // currentUserChecker: ApiAuthenticator.currentUserChecker,
    };
  }
 
}



