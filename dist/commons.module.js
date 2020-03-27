"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logger_module_1 = require("./logger/logger.module");
const router_module_1 = require("./router/router.module");
const compression_module_1 = require("./compression/compression.module");
const security_module_1 = require("./security/security.module");
const validation_module_1 = require("./validation/validation.module");
const roles_module_1 = require("./roles/roles.module");
const permissions_module_1 = require("./permissions/permissions.module");
let CommonsModule = class CommonsModule {
};
CommonsModule = __decorate([
    common_1.Module({
        imports: [
            logger_module_1.LoggerModule,
            router_module_1.RouterModule,
            compression_module_1.CompressionModule,
            security_module_1.SecurityModule,
            validation_module_1.ValidationModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
        ],
        exports: [
            logger_module_1.LoggerModule,
            router_module_1.RouterModule,
            compression_module_1.CompressionModule,
            security_module_1.SecurityModule,
            validation_module_1.ValidationModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
        ],
    })
], CommonsModule);
exports.CommonsModule = CommonsModule;
