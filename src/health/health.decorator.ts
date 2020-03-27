import { SetMetadata } from '@nestjs/common';
import { HEALTH_ENDPOINT_DECORATOR } from './health.constants';

export const HealthEndpoint = (isHealthEndpoint = true) =>
  SetMetadata(HEALTH_ENDPOINT_DECORATOR, isHealthEndpoint);
