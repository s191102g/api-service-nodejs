import './infras/AliasRegister'
import './infras/SingletonRegister'

import { API_PORT } from "./configs/Configuration";
import { ApiService } from "./infras/api/AppService";
import { Container } from "typedi";
import { IDbContext } from '@shared/database/interfaces/IDbContext';
// import { IRedisContext } from '@shared/database/interfaces/IRedisContext';

const dbContext = Container.get<IDbContext>('db.context')
// const redisContext = Container.get<IRedisContext>('redis.context')
const startApplication = async (): Promise<void> => {
  // await redisContext.createConnection();
   await dbContext.connect();
   ApiService.init(API_PORT);
   
 };

if (process.env.NODE_ENV != 'production') {
  console.log(`  =============================
  =                           =
  =       DEV BY SANG         =
  =                           =
  =============================
 `);
  console.info(
    `Starting project on local`
  )
  startApplication()
  .then(async () => {
       console.info(
        `Api service is ready on http://localhost:${API_PORT} `
       )
  });

} else {
  console.info(
    `Starting project on production`
  )
  startApplication().then(async () => {
       console.info(
        `Api service is ready on http://host:${API_PORT} `
       )
  });
}




