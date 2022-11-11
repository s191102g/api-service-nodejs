// import './infras/AliasRegister'
import "./infras/SingletonRegister";

import { API_PORT } from "./configs/Configuration";
import { ApiService } from "./infras/api/AppService";
import { Container } from "typedi";
import { IDbContext } from "./core/shared/database/interfaces/IDbContext";
import cluster from "cluster";
import os from "os";

const dbContext = Container.get<IDbContext>("db.context");
const startApplication = async (): Promise<void> => {
  await dbContext.createConnection();
  ApiService.init( Number(API_PORT) );
};

if (process.env.NODE_ENV != "production") {
  console.info(`Starting project \x1b[1m\x1b[96mDols\x1b[0m\x1b[21m on \x1B[2mlocal`);
  startApplication().then(async () => {
    console.info(
    
      `Api service is ready on \x1b[32m http://localhost:${API_PORT} \x1b[0m`
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
