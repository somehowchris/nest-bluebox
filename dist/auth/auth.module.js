"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
const jwt_constants_1 = require("./jwt.constants");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./auth.guard");
class AuthModule {
    static registerAsync(options) {
        const baseConfig = {
            global: false,
            module: AuthModule,
            imports: [...options.imports, jwt_1.JwtModule.register({})],
            providers: [
                jwt_strategy_1.JwtStrategy,
                {
                    provide: jwt_constants_1.JWT_SECRET,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                {
                    provide: jwt_constants_1.SECURE_HEALTH_ENDPOINT,
                    useValue: options.secureHealthEndpoint || false,
                },
            ],
            exports: [],
        };
        if (options.useGlobal && options.useGlobal === true) {
            baseConfig.providers.push({
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.JwtAuthGuard,
            });
        }
        return baseConfig;
    }
}
exports.AuthModule = AuthModule;
