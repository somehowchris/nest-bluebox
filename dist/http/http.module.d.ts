import { DynamicModule } from '@nestjs/common';
import { HealthService } from '../health/health.service';
import { DNSHealthIndicator } from '@nestjs/terminus';
import { HttpModuleConfig } from './http-config.type';
import { DynamicModuleConfigProvider } from './http.type';
export declare class HttpModule {
    private readonly config;
    private readonly healthService;
    private readonly dnsHealthIndicator;
    static register(config?: HttpModuleConfig): DynamicModule;
    static registerAsync(options: DynamicModuleConfigProvider<HttpModuleConfig>): DynamicModule;
    private readonly logger;
    constructor(config: HttpModuleConfig, healthService: HealthService, dnsHealthIndicator: DNSHealthIndicator);
}
