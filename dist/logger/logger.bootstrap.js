"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const logger_service_1 = require("./logger.service");
class LoggerBootstrap {
}
LoggerBootstrap.useLogger = (app) => {
    const loggerService = app.get(logger_service_1.LoggerService);
    app.useLogger(loggerService);
};
LoggerBootstrap.notifyServerIsListening = (env) => () => {
    const logger = new common_1.Logger(env.app.name);
    logger.log('Server is listening on ' + env.port);
};
exports.LoggerBootstrap = LoggerBootstrap;
