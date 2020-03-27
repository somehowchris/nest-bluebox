import { DynamicModule } from '@nestjs/common';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { HealthService } from '../health/health.service';
import { TypeOrmHealthIndicator } from '@nestjs/terminus';
export declare class DatabaseModule {
    private readonly healthService;
    private readonly typeormHealthIndicator;
    private readonly name;
    static registerAsync(options: TypeOrmModuleAsyncOptions): DynamicModule;
    constructor(healthService: HealthService, typeormHealthIndicator: TypeOrmHealthIndicator, name: string);
}
