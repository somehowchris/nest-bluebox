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
var HttpModule_1;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const http_constants_1 = require("./http.constants");
const health_service_1 = require("../health/health.service");
const terminus_1 = require("@nestjs/terminus");
let HttpModule = HttpModule_1 = class HttpModule {
    constructor(config, healthService, dnsHealthIndicator) {
        this.config = config;
        this.healthService = healthService;
        this.dnsHealthIndicator = dnsHealthIndicator;
        this.logger = new common_1.Logger(HttpModule_1.name);
        if (!this.healthService) {
            return;
        }
        if (this.config.baseURL) {
            this.healthService.register(() => this.dnsHealthIndicator.pingCheck(this.config.serviceName || this.config.baseURL, this.config.baseURL), this.config.serviceName || this.config.baseURL);
            return;
        }
        this.logger.warn('No base url defined to check health on a depending service');
    }
    static register(config) {
        const httpModule = common_2.HttpModule.register(config);
        return {
            global: false,
            module: HttpModule_1,
            imports: [httpModule],
            providers: [
                {
                    provide: http_constants_1.HTTP_MODULE_CONFIG,
                    useValue: config || {},
                },
            ],
            exports: [httpModule],
        };
    }
    static registerAsync(options) {
        const httpModule = common_2.HttpModule.registerAsync(options);
        return {
            global: false,
            module: HttpModule_1,
            imports: [...options.imports, httpModule],
            providers: [
                {
                    provide: http_constants_1.HTTP_MODULE_CONFIG,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
            ],
            exports: [httpModule],
        };
    }
};
HttpModule = HttpModule_1 = __decorate([
    common_1.Module({}),
    __param(0, common_1.Inject(http_constants_1.HTTP_MODULE_CONFIG)),
    __param(1, common_1.Optional()),
    __param(2, common_1.Optional()),
    __metadata("design:paramtypes", [Object, health_service_1.HealthService,
        terminus_1.DNSHealthIndicator])
], HttpModule);
exports.HttpModule = HttpModule;
