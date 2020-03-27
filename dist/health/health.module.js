"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HealthModule_1;
const common_1 = require("@nestjs/common");
const health_service_1 = require("./health.service");
const terminus_1 = require("@nestjs/terminus");
const health_http_controller_1 = require("./health.http-controller");
const health_service_controller_1 = require("./health.service-controller");
let HealthModule = HealthModule_1 = class HealthModule {
    static register(options) {
        const mod = {
            module: HealthModule_1,
            imports: [terminus_1.TerminusModule],
            providers: [health_service_1.HealthService],
            exports: [health_service_1.HealthService, terminus_1.TerminusModule],
            controllers: [],
        };
        if (options.enableHttpEndpoint === true) {
            mod.controllers.push(health_http_controller_1.HttpHealthController);
        }
        if (options.enableMicroservicesCommand === true) {
            mod.controllers.push(health_service_controller_1.ServiceHealthController);
        }
        return mod;
    }
};
HealthModule = HealthModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], HealthModule);
exports.HealthModule = HealthModule;
