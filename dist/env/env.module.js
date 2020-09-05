"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_service_1 = require("./env.service");
const environment_constants_1 = require("./environment.constants");
const env_validation_1 = require("./env.validation");
class EnvironmentModule {
    static register(validator) {
        return {
            global: true,
            module: EnvironmentModule,
            providers: [
                {
                    provide: environment_constants_1.ENVIRONMENT_FILE_PATHS,
                    useValue: process.env.NODE_ENV
                        ? [`.${process.env.NODE_ENV}.env`]
                        : ['.env', `.development.env`],
                },
                {
                    provide: environment_constants_1.ENVIRONMENT_VALIDATOR,
                    useValue: validator || env_validation_1.BaseEnvironmentValidation,
                },
                {
                    provide: env_service_1.EnvService,
                    useClass: env_service_1.EnvService,
                },
                {
                    provide: environment_constants_1.ENVIRONMENT,
                    useFactory: (environmentService) => environmentService.env,
                    inject: [env_service_1.EnvService],
                },
            ],
            exports: [environment_constants_1.ENVIRONMENT],
        };
    }
}
exports.EnvironmentModule = EnvironmentModule;
