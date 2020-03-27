import {
  LoggerService as NestLoggerService,
  Injectable,
  Inject,
  Optional,
} from '@nestjs/common';
import { format, Logger, createLogger, transports } from 'winston';
import { LogLevels } from './log-levels.enum';
import { nestLikeConsoleFormat } from './logger.helper';
import { ENVIRONMENT } from '../env/environment.constants';
import * as ecsFormat from '@elastic/ecs-winston-format';
import { LoggerEnvironmentInterface } from './environment/environment.interface';
import { BaseEnvironmentInterface } from '../env/env.interface';
import { JoinEnvironments } from '../env/env.helper';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor(
    @Optional() @Inject(ENVIRONMENT)
    private readonly env: JoinEnvironments<
      LoggerEnvironmentInterface,
      BaseEnvironmentInterface
    >,
  ) {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          handleExceptions: true,
          format:
            this.env && this.env.logger && this.env.logger.useElastic
              ? ecsFormat()
              : format.combine(
                format.timestamp(),
                format.errors({ stack: true }),
                nestLikeConsoleFormat(this.env),
              ),
        }),
      ],
    });

    this.log(
      this.env && this.env.logger && this.env.logger.useElastic
        ? 'Using Elastic styled logging'
        : 'Using custom local logging',
      LoggerService.name,
    );
  }

  public log(message: string, context?: string): void {
    this.writeLog(LogLevels.INFO, message, context);
  }

  public warn(message: string, context?: string): void {
    this.writeLog(LogLevels.WARN, message, context);
  }

  public error(message: string, trace: any, context?: string): void {
    this.writeLog(LogLevels.ERROR, message, context, trace);
  }

  private writeLog(
    level: string,
    message: string,
    context?: string,
    ...args: any
  ) {
    if (context) {
      this.logger[level](`[${context}] ${message}`, args);
    } else {
      this.logger[level](message, args);
    }
  }
}
