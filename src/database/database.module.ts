import { Optional, DynamicModule, Inject } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { HealthService } from '../health/health.service';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
import { getConnection } from 'typeorm';
import { DATABASE_NAME } from './database.constant';

/**
 * Import and provide base typeorm (mysql) related classes.
 *
 * @module
 */
export class DatabaseModule {
  static registerAsync(options: TypeOrmModuleAsyncOptions): DynamicModule {
    return {
      imports: [TypeOrmModule.forRootAsync(options)],
      module: DatabaseModule,
      providers: [
        {
          provide: DATABASE_NAME,
          useValue: options.name || 'default',
        },
      ],
    };
  }
  constructor(
    @Optional() private readonly healthService: HealthService,
    @Optional() private readonly typeormHealthIndicator: TypeOrmHealthIndicator,
    @Optional() @Inject(DATABASE_NAME) private readonly name: string,
  ) {
    if (!this.healthService) {
      return;
    }

    this.healthService.register(
      () =>
        this.typeormHealthIndicator.pingCheck(this.name, {
          connection: getConnection(this.name),
          timeout: 1500,
        }),
      this.name,
    );
  }
}
