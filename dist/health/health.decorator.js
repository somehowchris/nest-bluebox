"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const health_constants_1 = require("./health.constants");
exports.HealthEndpoint = (isHealthEndpoint = true) => common_1.SetMetadata(health_constants_1.HEALTH_ENDPOINT_DECORATOR, isHealthEndpoint);
