"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var SecurityModule_1;
const helmet = require("helmet");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
let SecurityModule = SecurityModule_1 = class SecurityModule {
    constructor() {
        this.logger = new common_1.Logger(SecurityModule_1.name);
    }
    configure(consumer) {
        consumer
            .apply(helmet(), helmet_1.hsts({
            maxAge: 31536000,
            includeSubDomains: true,
        }), helmet_1.noCache())
            .forRoutes('*');
        this.logger.log('Applied security middleware');
    }
};
SecurityModule = SecurityModule_1 = __decorate([
    common_1.Module({})
], SecurityModule);
exports.SecurityModule = SecurityModule;
