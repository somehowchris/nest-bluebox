import { Module, DynamicModule, Global } from '@nestjs/common';
import { EnvService } from './env.service';
import { BaseEnvironmentInterface } from './env.interface';
import {
  ENVIRONMENT,
  ENVIRONMENT_VALIDATOR,
  ENVIRONMENT_FILE_PATHS,
} from './environment.constants';
import { EnvironmentValidationType } from './env-validation.type';
import { Schema } from '@hapi/joi';

@Global()
@Module({})
export class EnvironmentModule {
  static register<T extends BaseEnvironmentInterface>(
    validator: EnvironmentValidationType<T, Schema>,
  ): DynamicModule {
    return {
      global: true,
      module: EnvironmentModule,
      providers: [
        {
          provide: ENVIRONMENT_FILE_PATHS,
          useValue: process.env.NODE_ENV
            ? [`.${process.env.NODE_ENV}.env`]
            : ['.env', `.development.env`],
        },
        {
          provide: ENVIRONMENT_VALIDATOR,
          useValue: validator,
        },
        {
          provide: EnvService,
          useClass: EnvService,
        },
        {
          provide: ENVIRONMENT,
          useFactory: (environmentService: EnvService<T>) =>
            environmentService.env,
          inject: [EnvService],
        },
      ],
      exports: [ENVIRONMENT],
    };
  }
}
