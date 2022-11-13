"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./infras/SingletonRegister");
const Configuration_1 = require("./configs/Configuration");
const AppService_1 = require("./infras/api/AppService");
const typedi_1 = require("typedi");
const cluster_1 = tslib_1.__importDefault(require("cluster"));
const os_1 = tslib_1.__importDefault(require("os"));
const dbContext = typedi_1.Container.get("db.context");
const startApplication = async () => {
    await dbContext.createConnection();
    AppService_1.ApiService.init(Number(Configuration_1.API_PORT));
};
if (process.env.NODE_ENV != "production") {
    console.info(`Starting project \x1b[1m\x1b[96mDols\x1b[0m\x1b[21m on \x1B[2mlocal`);
    startApplication().then(async () => {
        console.info(`Api service is ready on \x1b[32m http://localhost:${Configuration_1.API_PORT} \x1b[0m`);
    });
}
else {
    if (cluster_1.default.isMaster) {
        console.log("Master process start running.", process.pid);
        for (var i = 0, coreCount = os_1.default.cpus().length; i < coreCount; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on("exit", function handleExit(worker) {
            console.log("Worker stop.", worker.process.pid);
            console.log("Dying:", worker.exitedAfterDisconnect);
            if (!worker.exitedAfterDisconnect) {
                var worker = cluster_1.default.fork();
            }
        });
    }
    else if (cluster_1.default.isWorker) {
        console.info(`Starting project on production`);
        startApplication().then(async () => {
            console.log(`Api service is ready on http://host:${Configuration_1.API_PORT} `);
        });
        console.log("Worker start.", process.pid);
    }
}
