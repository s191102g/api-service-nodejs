import "reflect-metadata";
// import "./redis/RedisRegister"
import './data/DbRegister'
import './services/ServiceRegister'
import * as routingController from "routing-controllers";
import * as typeorm from "typeorm";
import { Container } from "typeorm-typedi-extensions";

typeorm.useContainer(Container);
routingController.useContainer(Container);