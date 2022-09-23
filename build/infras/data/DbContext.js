"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbContext = void 0;
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const ORM_1 = __importDefault(require("../../configs/ORM"));
let DbContext = class DbContext {
    async connect(connectionName = "default") {
        let connection;
        try {
            connection = (0, typeorm_1.getConnection)(connectionName);
        }
        catch (e) { }
        try {
            if (connection) {
                if (!connection.isConnected) {
                    await connection.connect();
                }
            }
            else {
                await (0, typeorm_1.createConnection)(ORM_1.default);
            }
            console.log("🌴 Database connection was successful!");
        }
        catch (e) {
            console.error("ERROR: Database connection failed!!", e);
            throw e;
        }
    }
};
DbContext = __decorate([
    (0, typedi_1.Service)('db.cotext')
], DbContext);
exports.DbContext = DbContext;
