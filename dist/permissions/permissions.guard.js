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
var PermissionsGuard_1;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permissions_constants_1 = require("./permissions.constants");
const user_utils_1 = require("../user/user.utils");
let PermissionsGuard = PermissionsGuard_1 = class PermissionsGuard {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger(PermissionsGuard_1.name);
        this.logger.log('PermissionsGuard loaded');
    }
    canActivate(context) {
        const permissions = this.reflector.get(permissions_constants_1.PERMISSIONS_DECORATOR_KEY, context.getHandler());
        if (permissions === undefined) {
            return true;
        }
        const user = user_utils_1.getUser(context);
        this.logger.log((!!user
            ? `Checking if ${user.username} has the permissions`
            : 'Not user found but needed the needed permissions were: ') +
            permissions.join(', '));
        if (!(user &&
            user.permissions &&
            user.permissions.filter(userPermission => permissions.findIndex(permission => permission === userPermission) >
                -1).length === permissions.length)) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'Needed permission(s) not provided',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
PermissionsGuard = PermissionsGuard_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionsGuard);
exports.PermissionsGuard = PermissionsGuard;
