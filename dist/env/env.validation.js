"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("@hapi/joi");
exports.BaseEnvironmentValidation = {
    nodeEnv: joi_1.string().default('devlopment'),
    port: joi_1.number().default(3000),
    app: {
        name: joi_1.string().required(),
    },
};
