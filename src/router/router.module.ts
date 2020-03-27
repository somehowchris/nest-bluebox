import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';
import { RouterMiddleware } from './router.middleware';

@Module({
  imports: [],
})
export class RouterModule {
  private readonly logger = new Logger(RouterModule.name);

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouterMiddleware).forRoutes('*');

    this.logger.log('Applied router middleware');
  }
}
