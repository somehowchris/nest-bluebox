import { HealthIndicatorResult } from '@nestjs/terminus';
import { Logger } from '@nestjs/common';
export declare type HealthIndicatorMethod = (logger: Logger) => Promise<HealthIndicatorResult>;
export interface HealthReport {
    [key: string]: HealthIndicatorResult;
}
