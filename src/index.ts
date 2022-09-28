import './infras/AliasRegister'
import './infras/SingletonRegister'

import { API_PORT } from "./configs/Configuration";
import { ApiService } from "./infras/api/AppService";
import { IDbContext } from "./core/shared/database/interfaces/IDbContext";
import { Container } from "typedi";

const dbContext = Container.get<IDbContext>('db.context')

const startApplication = async (): Promise<void> => {
  
   await dbContext.connect()
   ApiService.init(API_PORT);
   
 };

if (process.env.NODE_ENV != 'production') {
  console.info(
    `Starting project`
  )
  startApplication().then(async () => {
       console.info(
        `Api service is ready on http://localhost:${API_PORT} `
       )
  });

} else {
  console.info(
    `Starting project in production`
  )
  startApplication().then(async () => {
       console.info(
        `Api service is ready on http://localhost:${API_PORT} `
       )
  });
}




