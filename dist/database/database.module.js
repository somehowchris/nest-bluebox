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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const health_service_1 = require("../health/health.service");
const terminus_1 = require("@nestjs/terminus");
const typeorm_2 = require("typeorm");
const database_constant_1 = require("./database.constant");
let DatabaseModule = class DatabaseModule {
    constructor(healthService, typeormHealthIndicator, name) {
        this.healthService = healthService;
        this.typeormHealthIndicator = typeormHealthIndicator;
        this.name = name;
        if (!this.healthService) {
            return;
        }
        this.healthService.register(() => this.typeormHealthIndicator.pingCheck(this.name, {
            connection: typeorm_2.getConnection(this.name),
            timeout: 1500,
        }), this.name);
    }
    static registerAsync(options) {
        return {
            imports: [typeorm_1.TypeOrmModule.forRootAsync(options)],
            module: DatabaseModule,
            providers: [
                {
                    provide: database_constant_1.DATABASE_NAME,
                    useValue: options.name || 'default',
                },
            ],
        };
    }
};
DatabaseModule = __decorate([
    __param(0, common_1.Optional()),
    __param(1, common_1.Optional()),
    __param(2, common_1.Optional()), __param(2, common_1.Inject(database_constant_1.DATABASE_NAME)),
    __metadata("design:paramtypes", [health_service_1.HealthService,
        terminus_1.TypeOrmHealthIndicator, String])
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
