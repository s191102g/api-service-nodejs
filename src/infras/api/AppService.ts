

import 'reflect-metadata';
import express from "express";
import path from "path";
import { useExpressServer } from "routing-controllers";
import { Container } from 'typeorm-typedi-extensions';
import { useContainer  } from 'routing-controllers';

export class ApiService {
  static init(port: string | undefined) {
    const app = express();

    app.get("/test", (_req, res) => {
      res.status(200).end("ok");
    });
   
   
    
    useExpressServer(app, {
      controllers: [path.join(__dirname + '/controllers/**/*{.js,.ts}')],
      validation: false
    });
    useContainer(Container)
    app.listen(port); 
  }

  
}



