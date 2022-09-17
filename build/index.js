"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration_1 = require("./config/Configuration");
const DbConfig_1 = require("./config/DbConfig");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.get('/', function (req, res) {
    var en = null;
    if (process.env.NODE_ENV == 'production') {
        en = DbConfig_1.dev2;
    }
    else {
        en = Configuration_1.dev;
    }
    res.json({
        data: en
    });
});
app.listen(port, function () {
    console.log("Your app running on port " + port);
});
