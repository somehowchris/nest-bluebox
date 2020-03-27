"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs_1 = require("fs");
exports.findProjectRoot = (dir = process.cwd()) => {
    if (fs_1.existsSync(dir + '/package.json')) {
        return dir;
    }
    if (path.dirname(dir) === '/') {
        throw new Error('No package.json found');
    }
    try {
        return exports.findProjectRoot(path.dirname(dir));
    }
    catch (e) {
        throw new Error('No package.json found');
    }
};
exports.readJsonFile = filePath => {
    return JSON.parse(fs_1.readFileSync(filePath).toString());
};
