import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SeedModule } from './seed.module';
import { LoggerBootstrap } from '../../logger/logger.bootstrap';

async function bootstrap() {
  NestFactory.create(SeedModule, {
    logger: false,
  })
    .then(app => {
      LoggerBootstrap.useLogger(app);

      const logger = new Logger('Seeder');
      const seeder = app.get(SeedModule);

      seeder
        .seed()
        .then(() => {
          logger.log('Seeding complete!');
        })
        .catch(error => {
          logger.error('Seeding failed!', error.toString());
        })
        .finally(() => app.close());
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
