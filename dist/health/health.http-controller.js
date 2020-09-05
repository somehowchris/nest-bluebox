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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const health_service_1 = require("./health.service");
const health_decorator_1 = require("./health.decorator");
const auth_guard_1 = require("../auth/auth.guard");
let HttpHealthController = class HttpHealthController {
    constructor(healthService) {
        this.healthService = healthService;
    }
    httpHealthEndpoint() {
        return this.healthService.getStatus();
    }
};
__decorate([
    common_1.Get(''),
    health_decorator_1.HealthEndpoint(),
    common_1.UseGuards(auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HttpHealthController.prototype, "httpHealthEndpoint", null);
HttpHealthController = __decorate([
    common_1.Controller('health'),
    __metadata("design:paramtypes", [health_service_1.HealthService])
], HttpHealthController);
exports.HttpHealthController = HttpHealthController;
