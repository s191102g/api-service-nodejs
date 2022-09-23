"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routing_controllers_1 = require("routing-controllers");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const routing_controllers_2 = require("routing-controllers");
class ApiService {
    static init(port) {
        const app = (0, express_1.default)();
        app.get("/test", (_req, res) => {
            res.status(200).end("ok");
        });
        (0, routing_controllers_1.useExpressServer)(app, {
            controllers: [path_1.default.join(__dirname + '/controllers/**/*{.js,.ts}')],
            validation: false
        });
        (0, routing_controllers_2.useContainer)(typeorm_typedi_extensions_1.Container);
        app.listen(port);
    }
}
exports.ApiService = ApiService;
