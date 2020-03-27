import {
  Module,
  DynamicModule,
  Inject,
  Optional,
  Logger,
} from '@nestjs/common';
import { HttpModule as NestHttpModule } from '@nestjs/common';
import { HTTP_MODULE_CONFIG } from './http.constants';
import { HealthService } from '../health/health.service';
import { DNSHealthIndicator } from '@nestjs/terminus';
import { HttpModuleConfig } from './http-config.type';
import { DynamicModuleConfigProvider } from './http.type';

@Module({})
export class HttpModule {
  static register(config?: HttpModuleConfig): DynamicModule {
    const httpModule = NestHttpModule.register(config);

    return {
      global: false,
      module: HttpModule,
      imports: [httpModule],
      providers: [
        {
          provide: HTTP_MODULE_CONFIG,
          useValue: config || {},
        },
      ],
      exports: [httpModule],
    };
  }

  static registerAsync(
    options: DynamicModuleConfigProvider<HttpModuleConfig>,
  ): DynamicModule {
    const httpModule = NestHttpModule.registerAsync(options);

    return {
      global: false,
      module: HttpModule,
      imports: [...options.imports, httpModule],
      providers: [
        {
          provide: HTTP_MODULE_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [httpModule],
    };
  }

  private readonly logger = new Logger(HttpModule.name);

  constructor(
    @Inject(HTTP_MODULE_CONFIG) private readonly config: HttpModuleConfig,
    @Optional() private readonly healthService: HealthService,
    @Optional() private readonly dnsHealthIndicator: DNSHealthIndicator,
  ) {
    if (!this.healthService) {
      return;
    }

    if (this.config.baseURL) {
      this.healthService.register(
        () =>
          this.dnsHealthIndicator.pingCheck(
            this.config.serviceName || this.config.baseURL,
            this.config.baseURL,
          ),
        this.config.serviceName || this.config.baseURL,
      );
      return;
    }
    this.logger.warn(
      'No base url defined to check health on a depending service',
    );
  }
}
