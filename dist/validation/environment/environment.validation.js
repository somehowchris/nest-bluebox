"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("@hapi/joi");
exports.ValidationEnvironmentValidation = {
    showErrors: joi_1.boolean().default(true),
    onlyWhitelistedProperties: joi_1.boolean().default(true),
    transformInputs: joi_1.boolean().default(true),
};
