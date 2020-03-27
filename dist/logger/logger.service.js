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
var LoggerService_1;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const log_levels_enum_1 = require("./log-levels.enum");
const logger_helper_1 = require("./logger.helper");
const environment_constants_1 = require("../env/environment.constants");
const ecsFormat = require("@elastic/ecs-winston-format");
let LoggerService = LoggerService_1 = class LoggerService {
    constructor(env) {
        this.env = env;
        this.logger = winston_1.createLogger({
            transports: [
                new winston_1.transports.Console({
                    handleExceptions: true,
                    format: this.env.logger && this.env.logger.useElastic
                        ? ecsFormat()
                        : winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), logger_helper_1.nestLikeConsoleFormat(this.env)),
                }),
            ],
        });
        this.log(this.env.logger && this.env.logger.useElastic
            ? 'Using Elastic styled logging'
            : 'Using custom local logging', LoggerService_1.name);
    }
    log(message, context) {
        this.writeLog(log_levels_enum_1.LogLevels.INFO, message, context);
    }
    warn(message, context) {
        this.writeLog(log_levels_enum_1.LogLevels.WARN, message, context);
    }
    error(message, trace, context) {
        this.writeLog(log_levels_enum_1.LogLevels.ERROR, message, context, trace);
    }
    writeLog(level, message, context, ...args) {
        if (context) {
            this.logger[level](`[${context}] ${message}`, args);
        }
        else {
            this.logger[level](message, args);
        }
    }
};
LoggerService = LoggerService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(environment_constants_1.ENVIRONMENT)),
    __metadata("design:paramtypes", [Object])
], LoggerService);
exports.LoggerService = LoggerService;
