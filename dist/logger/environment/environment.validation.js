"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("@hapi/joi");
exports.LoggerEnvironmentValidation = {
    logger: {
        useElastic: joi_1.boolean().default(false),
    },
};
