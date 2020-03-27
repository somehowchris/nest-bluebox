import { INestApplication, Logger } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { BaseEnvironmentInterface } from '../env/env.interface';

export class LoggerBootstrap {
  static useLogger = (app: INestApplication): void => {
    const loggerService = app.get<LoggerService>(LoggerService);
    app.useLogger(loggerService);
  };

  static notifyServerIsListening = (env: BaseEnvironmentInterface) => () => {
    const logger = new Logger(env.app.name);
    logger.log('Server is listening on ' + env.port);
  };
}
