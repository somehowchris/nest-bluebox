import { Module, Global, DynamicModule } from '@nestjs/common';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpHealthController } from './health.http-controller';
import { ServiceHealthController } from './health.service-controller';

@Global()
@Module({})
export class HealthModule {
  static register(options: {
    enableHttpEndpoint?: boolean;
    enableMicroservicesCommand?: boolean;
  }): DynamicModule {
    const mod: DynamicModule = {
      module: HealthModule,
      imports: [TerminusModule],
      providers: [HealthService],
      exports: [HealthService, TerminusModule],
      controllers: [],
    };

    if (options.enableHttpEndpoint === true) {
      mod.controllers.push(HttpHealthController);
    }

    if (options.enableMicroservicesCommand === true) {
      mod.controllers.push(ServiceHealthController);
    }

    return mod;
  }
}
