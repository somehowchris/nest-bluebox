import { Injectable, Logger } from '@nestjs/common';
import { HealthIndicatorMethod, HealthReport } from './health.type';
import { MemoryHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private healthIndicators = [];

  constructor(
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly diskHealthIndicator: DiskHealthIndicator,
  ) {
    this.register(
      () =>
        this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
      'memory_heap',
    );
    this.register(
      () =>
        this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
      'memory_rss',
    );
    this.register(
      () =>
        this.diskHealthIndicator.checkStorage('storage', {
          threshold: 0.8,
          path: '/',
        }),
      'storage',
    );
  }

  public register(indicator: HealthIndicatorMethod, name?: string): void {
    this.logger.log(
      name ? `Adding ${name} to the health checks` : 'Adding health check',
    );
    this.healthIndicators.push(indicator);
  }

  public async getStatus(): Promise<HealthReport> {
    this.logger.log('Checking service availability');
    const results = await Promise.all(
      this.healthIndicators.map(el =>
        el(this.logger).catch(err => (err.causes ? { ...err.causes } : err)),
      ),
    );

    return results.reduce((prev, current) => ({ ...prev, ...current }), {});
  }
}
