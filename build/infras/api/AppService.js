"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const ApiDocument_1 = require("./ApiDocument");
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const typedi_1 = tslib_1.__importDefault(require("typedi"));
const HttpServer_1 = require("../servers/HttpServer");
const ApiAuthenticator_1 = require("./ApiAuthenticator");
class ApiService {
    static init(port, callback) {
        const app = (0, express_1.default)();
        const logger = typedi_1.default.get("log.service");
        app.get("/", (_req, res) => {
            res.status(200).end("ok");
        });
        const loggingMiddleware = logger.createMiddleware();
        app.use(loggingMiddleware);
        const options = this.getOptions({
            controllers: [path_1.default.join(__dirname + "/controllers/**/*{.js,.ts}")],
            middlewares: [path_1.default.join(__dirname, "./middlewares/*Middleware{.js,.ts}")],
            validation: false,
            development: !!(process.env.NODE_ENV != "production"),
        });
        const httpServer = new HttpServer_1.HttpServer();
        httpServer.createApp(app, options);
        const spec = ApiDocument_1.ApiDocument.generate(options);
        app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
        return httpServer.start(port, callback);
    }
    static getOptions(param) {
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
            authorizationChecker: ApiAuthenticator_1.ApiAuthenticator.authorizationChecker,
            currentUserChecker: ApiAuthenticator_1.ApiAuthenticator.currentUserChecker,
        };
    }
}
exports.ApiService = ApiService;
