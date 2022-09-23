
import { Container } from "typeorm-typedi-extensions";
import { API_PORT } from "./configs/Configuration";
import { ApiService } from "./infras/api/AppService";
import { DbContext } from "./infras/data/DbContext";



const dbContext = Container.get(DbContext)

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
    `Starting project`
  )
  startApplication().then(async () => {
       console.info(
        `Api service is ready on http://localhost:${API_PORT} `
       )
  });
}




