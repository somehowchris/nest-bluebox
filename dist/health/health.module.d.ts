import { DynamicModule } from '@nestjs/common';
export declare class HealthModule {
    static register(options: {
        enableHttpEndpoint?: boolean;
        enableMicroservicesCommand?: boolean;
    }): DynamicModule;
}
