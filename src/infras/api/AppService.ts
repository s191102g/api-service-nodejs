

import 'reflect-metadata';
import express from "express";
import path from "path";
import { useExpressServer } from "routing-controllers";
import { ApiDocument } from './ApiDocument';
import swaggerUiExpress from "swagger-ui-express";
export class ApiService {
  static init(port: string | undefined) {
    const app = express();

    app.get("/test", (_req, res) => {
      res.status(200).end("ok");
    });
    const options = {
      routePrefix: "/api",
      controllers: [path.join(__dirname + '/controllers/**/*{.js,.ts}')],
      validation: false
    }
    useExpressServer(app, options);
    const spec = ApiDocument.generate(options);
    app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
    app.listen(port); 
  }

  
}



