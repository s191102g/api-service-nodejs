// import './infras/AliasRegister'
import "./infras/SingletonRegister";

import { API_PORT } from "./configs/Configuration";
import { ApiService } from "./infras/api/AppService";
import { Container } from "typedi";
import { IDbContext } from "./core/shared/database/interfaces/IDbContext";
import cluster from "cluster";
import os from "os";
import { IRedisContext } from "./core/shared/database/interfaces/IRedisContext";

const dbContext = Container.get<IDbContext>("db.context");
const redisContext = Container.get<IRedisContext>('redis.context')
const startApplication = async (): Promise<void> => {
  await redisContext.createConnection();
  await dbContext.connect();
  ApiService.init(API_PORT);
};

if (process.env.NODE_ENV != "production") {
  console.log(`  =============================
  =                           =
  =       DEV BY SANG         =
  =                           =
  =============================
 `);
  console.info(`Starting project on local`);
  startApplication().then(async () => {
    console.info(
    
      `Api service is ready on http://localhost:${API_PORT} `
    );
  });
} else {
  if (cluster.isMaster) {
    console.log(
      
      "Master process start running.",
      process.pid
    );
    for (var i = 0, coreCount = os.cpus().length; i < coreCount; i++) {
      cluster.fork();
    }

    cluster.on("exit", function handleExit(worker) {
      console.log(
       
        "Worker stop.",
        worker.process.pid
      );
      console.log(
        
        "Dying:",
        worker.exitedAfterDisconnect
      );
      if (!worker.exitedAfterDisconnect) {
        var worker = cluster.fork();
      }
    });
  } else  if (cluster.isWorker) {
    console.info(`Starting project on production`);
    startApplication().then(async () => {
      console.log(`Api service is ready on http://host:${API_PORT} `);
    });

    console.log( "Worker start.", process.pid);
  }
}
