import "reflect-metadata";
import express from "express";
import path from "path";
import { RoutingControllersOptions } from "routing-controllers";
import { ApiDocument } from "./ApiDocument";
import swaggerUiExpress from "swagger-ui-express";
import Container from "typedi";
import { ILogService } from "../../core/gateways/services/ILogService";
import { HttpServer } from "../servers/HttpServer";
import * as paypal from 'paypal-rest-sdk';

// import { Server } from "http";
import { ApiAuthenticator } from "./ApiAuthenticator";
import * as fs from 'fs';
import * as https from 'https'
import { CLIENT_ID, CLIENT_SECRET, MODE } from "../../configs/Configuration";
import { SystemError } from "../../core/shared/exceptions/SystemError";
import { MessageError } from "../../core/shared/exceptions/message/MessageError";

paypal.configure({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  mode: MODE
})


export class ApiService {
  static init(port: number, callback?: () => void): void {
    const app = express();
    const logger = Container.get<ILogService>("log.service");
    app.get("/", (_req, res) => {
      res.status(200).end("ok");
    });


    app.get("/.well-known/pki-validation/0A9CEA6D4A86BBA22B8716A837682513.txt", (_req, res) => {
      res.sendFile('/var/app/current/0A9CEA6D4A86BBA22B8716A837682513.txt')
    });
    app.post('/api/v1/payment',(_req, res)=>{
          const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Nâng cấp dịch vụ tại DOLS",
                        "sku": "001",
                        "price": "1.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                },
                "description": "Nâng cấp dịch vụ tại DOLS"
            }]
        }

        paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
              throw new SystemError(MessageError.SOMETHING_WRONG)
          } 
          if(!payment){
              throw new SystemError(MessageError.SOMETHING_WRONG)
          }
          for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === 'approval_url') {
                res.json({link: payment.links[i].href})
              }
          }   
        });
    })
    const key = fs.readFileSync('./src/private.key');
    const cert= fs.readFileSync('./src/certificate.crt')
    const loggingMiddleware = logger.createMiddleware();
    app.use(loggingMiddleware);
    const options = this.getOptions({
      controllers: [path.join(__dirname + "/controllers/**/*{.js,.ts}")],
      middlewares: [path.join(__dirname, "./middlewares/*Middleware{.js,.ts}")],
      validation: false,
      development: !!(process.env.NODE_ENV != "production"),
    });
    const httpServer = new HttpServer();
    const aa =  httpServer.createApp(app, options);
    httpServer.createApp(app, options);
    const spec = ApiDocument.generate(options);
    app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
     httpServer.start(port, callback);
     https.createServer({ key, cert }, aa)
     .listen(8000,()=>{
      console.log('https');
      
     })
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
