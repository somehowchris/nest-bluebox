import { HealthIndicatorMethod, HealthReport } from './health.type';
import { MemoryHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus';
export declare class HealthService {
    private readonly memoryHealthIndicator;
    private readonly diskHealthIndicator;
    private readonly logger;
    private healthIndicators;
    constructor(memoryHealthIndicator: MemoryHealthIndicator, diskHealthIndicator: DiskHealthIndicator);
    register(indicator: HealthIndicatorMethod, name?: string): void;
    getStatus(): Promise<HealthReport>;
}
