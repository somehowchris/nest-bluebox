import { Controller, Get, UseGuards } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthReport } from './health.type';
import { HealthEndpoint } from './health.decorator';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('health')
export class HttpHealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('')
  @HealthEndpoint()
  @UseGuards(JwtAuthGuard)
  public httpHealthEndpoint(): Promise<HealthReport> {
    return this.healthService.getStatus();
  }
}
