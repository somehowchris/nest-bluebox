import { HealthService } from './health.service';
import { HealthReport } from './health.type';
import { MessagePattern } from '@nestjs/microservices';
import { HEALTH_COMMAND } from './health.constants';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UseGuards } from '@nestjs/common';

export class ServiceHealthController {
  constructor(private readonly healthService: HealthService) {}

  @MessagePattern({ cmd: HEALTH_COMMAND })
  @UseGuards(JwtAuthGuard)
  public microservicesHealthCommand(): Promise<HealthReport> {
    return this.healthService.getStatus();
  }
}
