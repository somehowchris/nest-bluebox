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
var RouterMiddleware_1;
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
const environment_constants_1 = require("../env/environment.constants");
let RouterMiddleware = RouterMiddleware_1 = class RouterMiddleware {
    constructor(env) {
        this.env = env;
        this.logger = new common_1.Logger(RouterMiddleware_1.name);
        this.format = this.env.nodeEnv !== 'development' ? 'combined' : 'dev';
        this.logger.log('Initiating router logging middleware');
    }
    use(req, res, next) {
        return morgan(this.format, {
            stream: {
                write: this.logger.log.bind(this.logger),
            },
        })(req, res, next);
    }
};
RouterMiddleware = RouterMiddleware_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(environment_constants_1.ENVIRONMENT)),
    __metadata("design:paramtypes", [Object])
], RouterMiddleware);
exports.RouterMiddleware = RouterMiddleware;
