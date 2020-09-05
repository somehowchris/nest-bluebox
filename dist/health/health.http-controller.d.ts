import { HealthService } from './health.service';
import { HealthReport } from './health.type';
export declare class HttpHealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    httpHealthEndpoint(): Promise<HealthReport>;
}
