import { HealthService } from './health.service';
import { HealthReport } from './health.type';
export declare class ServiceHealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    microservicesHealthCommand(): Promise<HealthReport>;
}
