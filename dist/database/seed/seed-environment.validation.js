"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_validation_1 = require("../../env/env.validation");
const environment_validation_1 = require("../environment/environment.validation");
const environment_validation_2 = require("../../logger/environment/environment.validation");
exports.SeedEnvironmentValidation = Object.assign({}, env_validation_1.BaseEnvironmentValidation, environment_validation_1.DatabaseEnvironmentValidation, environment_validation_2.LoggerEnvironmentValidation);
