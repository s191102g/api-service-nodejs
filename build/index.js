"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Configuration_1 = require("./configs/Configuration");
const AppService_1 = require("./infras/api/AppService");
const DbContext_1 = require("./infras/data/DbContext");
const dbContext = typeorm_typedi_extensions_1.Container.get(DbContext_1.DbContext);
const startApplication = async () => {
    await dbContext.connect();
    AppService_1.ApiService.init(Configuration_1.API_PORT);
};
if (process.env.NODE_ENV != 'production') {
    console.info(`Starting project`);
    startApplication().then(async () => {
        console.info(`Api service is ready on http://localhost:${Configuration_1.API_PORT} `);
    });
}
else {
    console.info(`Starting project`);
    startApplication().then(async () => {
        console.info(`Api service is ready on http://localhost:${Configuration_1.API_PORT} `);
    });
}
