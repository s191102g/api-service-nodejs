"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.appendFile = exports.writeFile = exports.readFileAsText = exports.readFile = exports.createDirectory = exports.getFilesSync = exports.getFiles = exports.getDirectoriesSync = exports.getDirectories = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
function getDirectories(dir) {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(dir, undefined, (err, list) => {
            if (err) {
                return reject(err);
            }
            resolve(list.filter((item) => fs_1.default.statSync(path_1.default.join(dir, item)).isDirectory()));
        });
    });
}
exports.getDirectories = getDirectories;
function getDirectoriesSync(dir) {
    const list = fs_1.default.readdirSync(dir);
    return list.filter((item) => fs_1.default.statSync(path_1.default.join(dir, item)).isDirectory());
}
exports.getDirectoriesSync = getDirectoriesSync;
function getFiles(dir) {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(dir, undefined, (err, list) => {
            if (err) {
                return reject(err);
            }
            resolve(list.filter((item) => !fs_1.default.statSync(path_1.default.join(dir, item)).isDirectory()));
        });
    });
}
exports.getFiles = getFiles;
function getFilesSync(dir) {
    const list = fs_1.default.readdirSync(dir);
    return list.filter((item) => !fs_1.default.statSync(path_1.default.join(dir, item)).isDirectory());
}
exports.getFilesSync = getFilesSync;
function createDirectory(dir) {
    const splitPath = dir.split("/");
    if (splitPath.length > 10) {
        throw new Error("The path is invalid!");
    }
    splitPath.reduce((path, subPath) => {
        let currentPath;
        if (subPath !== ".") {
            currentPath = path + "/" + subPath;
            if (!fs_1.default.existsSync(currentPath)) {
                fs_1.default.mkdirSync(currentPath);
            }
        }
        else {
            currentPath = subPath;
        }
        return currentPath;
    }, "");
}
exports.createDirectory = createDirectory;
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        if (!filePath || !filePath.trim()) {
            return reject(new Error("The path is required!"));
        }
        fs_1.default.readFile(filePath, undefined, (error, content) => {
            if (error) {
                return reject(error);
            }
            resolve(content);
        });
    });
}
exports.readFile = readFile;
function readFileAsText(filePath, encoding = "utf8") {
    return new Promise((resolve, reject) => {
        if (!filePath || !filePath.trim()) {
            return reject(new Error("The path is required!"));
        }
        fs_1.default.readFile(filePath, { encoding }, (error, content) => {
            if (error) {
                return reject(error);
            }
            resolve(content);
        });
    });
}
exports.readFileAsText = readFileAsText;
function writeFile(filePath, content, encoding) {
    return new Promise((resolve, reject) => {
        if (!filePath || !filePath.trim()) {
            return reject(new Error("The path is required!"));
        }
        if (!content) {
            return reject(new Error("The content is required!"));
        }
        const dir = path_1.default.dirname(filePath);
        if (!fs_1.default.existsSync(dir)) {
            createDirectory(dir);
        }
        fs_1.default.writeFile(filePath, content, { encoding }, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
exports.writeFile = writeFile;
function appendFile(filePath, content, encoding) {
    return new Promise((resolve, reject) => {
        if (!filePath || !filePath.trim()) {
            return reject(new Error("The path is required!"));
        }
        if (!content) {
            return reject(new Error("The content is required!"));
        }
        const dir = path_1.default.dirname(filePath);
        if (!fs_1.default.existsSync(dir)) {
            createDirectory(dir);
        }
        fs_1.default.appendFile(filePath, content, { encoding }, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
exports.appendFile = appendFile;
function removeFile(filePath) {
    return new Promise((resolve, reject) => {
        if (!filePath || !filePath.trim()) {
            return reject(new Error("The path is required!"));
        }
        if (!fs_1.default.existsSync(filePath)) {
            resolve();
        }
        else {
            fs_1.default.unlink(filePath, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
        }
    });
}
exports.removeFile = removeFile;
