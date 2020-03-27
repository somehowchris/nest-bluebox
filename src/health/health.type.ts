import { HealthIndicatorResult } from '@nestjs/terminus';
import { Logger } from '@nestjs/common';

export type HealthIndicatorMethod = (
  logger: Logger,
) => Promise<HealthIndicatorResult>;

export interface HealthReport {
  [key: string]: HealthIndicatorResult;
}
