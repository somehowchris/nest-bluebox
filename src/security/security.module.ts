import * as helmet from 'helmet';
import { noCache, hsts } from 'helmet';
import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';

@Module({})
export class SecurityModule {
  private readonly logger = new Logger(SecurityModule.name);

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        helmet(),
        hsts({
          maxAge: 31536000,
          includeSubDomains: true,
        }),
        noCache(),
      )
      .forRoutes('*');

    this.logger.log('Applied security middleware');
  }
}
