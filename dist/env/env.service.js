"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var EnvService_1;
const dotenv_1 = require("dotenv");
const joi_1 = require("@hapi/joi");
const fs_1 = require("fs");
const env_helper_1 = require("./env.helper");
const common_1 = require("@nestjs/common");
const env_validation_1 = require("./env.validation");
const environment_constants_1 = require("./environment.constants");
let EnvService = EnvService_1 = class EnvService {
    constructor(filePath, validator) {
        this.filePath = filePath;
        this.validator = validator;
        this.logger = new common_1.Logger(EnvService_1.name);
        let config = process.env;
        if (typeof this.filePath === 'string') {
            this.filePath = [this.filePath];
        }
        for (const path of this.filePath) {
            if (fs_1.existsSync(path) === true && fs_1.lstatSync(path).isFile() === true) {
                this.logger.log('Loading configuration file from ' + path);
                config = dotenv_1.parse(fs_1.readFileSync(path));
                break;
            }
        }
        this.logger.log('Validating environment');
        const { validatedEnvConfig, objectTree } = this.validateInput(config);
        this.logger.log('Injecting environment variables into application');
        this.env = {};
        env_helper_1.unflattenEnv(this.env, validatedEnvConfig, objectTree);
    }
    validateInput(envConfig) {
        const [envValidationConfig, objectTree] = env_helper_1.flattenEnvObject({}, this.validator || env_validation_1.BaseEnvironmentValidation);
        const envVarsSchema = joi_1.object(envValidationConfig);
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig, {
            stripUnknown: true,
        });
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return {
            validatedEnvConfig,
            objectTree,
        };
    }
};
EnvService = EnvService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(environment_constants_1.ENVIRONMENT_FILE_PATHS)),
    __param(1, common_1.Inject(environment_constants_1.ENVIRONMENT_VALIDATOR)),
    __metadata("design:paramtypes", [Array, Object])
], EnvService);
exports.EnvService = EnvService;
