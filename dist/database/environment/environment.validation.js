"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("@hapi/joi");
exports.DatabaseEnvironmentValidation = {
    database: {
        type: joi_1.string().required(),
        host: joi_1.string().required(),
        port: joi_1.number().required(),
        username: joi_1.string().required(),
        password: joi_1.string(),
        database: joi_1.string().required(),
        synchronize: joi_1.boolean().default(false),
    },
};
