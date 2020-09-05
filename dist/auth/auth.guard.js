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
const passport_1 = require("@nestjs/passport");
const jwt_constants_1 = require("./jwt.constants");
const health_constants_1 = require("../health/health.constants");
const core_1 = require("@nestjs/core");
let JwtAuthGuard = class JwtAuthGuard extends passport_1.AuthGuard('jwt') {
    constructor(secureHealthEndpoint, reflector) {
        super();
        this.secureHealthEndpoint = secureHealthEndpoint;
        this.reflector = reflector;
    }
    canActivate(context) {
        if (!this.secureHealthEndpoint) {
            const isHealthEndpoint = this.reflector.get(health_constants_1.HEALTH_ENDPOINT_DECORATOR, context.getHandler());
            if (isHealthEndpoint) {
                return true;
            }
        }
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException();
        }
        return user;
    }
};
JwtAuthGuard = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(jwt_constants_1.SECURE_HEALTH_ENDPOINT)),
    __metadata("design:paramtypes", [Boolean, core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
