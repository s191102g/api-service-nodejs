"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("./DbContext");
const path_1 = tslib_1.__importDefault(require("path"));
const file_1 = require("../../utils/file");
const folder = path_1.default.join(__dirname, "./repositories");
(0, file_1.getFilesSync)(folder).forEach((file) => {
    if (!file.includes(".spec")) {
        require(`${folder}/${file}`);
    }
});
(0, file_1.getDirectoriesSync)(folder).forEach((childFolder) => {
    (0, file_1.getFilesSync)(`${folder}/${childFolder}`).forEach((file) => {
        if (!file.includes(".spec")) {
            require(`${folder}/${childFolder}/${file}`);
        }
    });
});
