"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EnvironmentModule_1;
const common_1 = require("@nestjs/common");
const env_service_1 = require("./env.service");
const environment_constants_1 = require("./environment.constants");
let EnvironmentModule = EnvironmentModule_1 = class EnvironmentModule {
    static register(validator) {
        return {
            global: true,
            module: EnvironmentModule_1,
            providers: [
                {
                    provide: environment_constants_1.ENVIRONMENT_FILE_PATHS,
                    useValue: process.env.NODE_ENV
                        ? [`.${process.env.NODE_ENV}.env`]
                        : ['.env', `.development.env`],
                },
                {
                    provide: environment_constants_1.ENVIRONMENT_VALIDATOR,
                    useValue: validator,
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
};
EnvironmentModule = EnvironmentModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], EnvironmentModule);
exports.EnvironmentModule = EnvironmentModule;
