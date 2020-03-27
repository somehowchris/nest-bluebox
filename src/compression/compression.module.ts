import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';
import * as compression from 'compression';

@Module({})
export class CompressionModule {
  private readonly logger = new Logger(CompressionModule.name);

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(compression()).forRoutes('*');

    this.logger.log('Applied compression middleware');
  }
}
