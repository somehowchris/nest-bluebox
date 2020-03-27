"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var RouterModule_1;
const common_1 = require("@nestjs/common");
const router_middleware_1 = require("./router.middleware");
let RouterModule = RouterModule_1 = class RouterModule {
    constructor() {
        this.logger = new common_1.Logger(RouterModule_1.name);
    }
    configure(consumer) {
        consumer.apply(router_middleware_1.RouterMiddleware).forRoutes('*');
        this.logger.log('Applied router middleware');
    }
};
RouterModule = RouterModule_1 = __decorate([
    common_1.Module({
        imports: [],
    })
], RouterModule);
exports.RouterModule = RouterModule;
