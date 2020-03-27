import { DynamicModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JWT_SECRET, SECURE_HEALTH_ENDPOINT } from './jwt.constants';
import { DynamicModuleConfigProvider } from '../http/http.type';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth.guard';

export class AuthModule {
  static registerAsync(
    options: DynamicModuleConfigProvider<string> & {
      useGlobal?: boolean;
      secureHealthEndpoint?: boolean;
    },
  ): DynamicModule {
    const baseConfig: DynamicModule = {
      global: false,
      module: AuthModule,
      imports: [...options.imports, JwtModule.register({})],
      providers: [
        JwtStrategy,
        {
          provide: JWT_SECRET,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        {
          provide: SECURE_HEALTH_ENDPOINT,
          useValue: options.secureHealthEndpoint || false,
        },
      ],
      exports: [],
    };

    if (options.useGlobal && options.useGlobal === true) {
      baseConfig.providers.push({
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      });
    }

    return baseConfig;
  }
}
