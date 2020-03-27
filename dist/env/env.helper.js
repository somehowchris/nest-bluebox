"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("@hapi/joi");
const string_1 = require("../utils/string");
exports.flattenEnvObject = (objectRef, obj, parent = undefined, res = {}) => {
    if (obj !== undefined) {
        for (const key in obj) {
            const propName = parent ? parent + '_' + key : key;
            if (typeof obj[key] === 'object' && joi_1.isSchema(obj[key]) === false) {
                objectRef[key] = {};
                exports.flattenEnvObject(objectRef[key], obj[key], propName, res);
            }
            else {
                res[string_1.camel2underscore(propName).toUpperCase()] = obj[key];
                objectRef[key] = string_1.camel2underscore(propName).toUpperCase();
            }
        }
        return [res, objectRef];
    }
};
exports.unflattenEnv = (envClass, env, treeValueMap) => {
    Object.getOwnPropertyNames(treeValueMap).forEach(el => {
        envClass[el] = envClass[el] === undefined ? {} : envClass[el];
        if (typeof treeValueMap[el] === 'object') {
            exports.unflattenEnv(envClass[el], env, treeValueMap[el]);
            return;
        }
        envClass[el] = env[treeValueMap[el]];
    });
};
