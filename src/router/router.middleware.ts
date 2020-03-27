import { Injectable, NestMiddleware, Logger, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import { BaseEnvironmentInterface } from '../env/env.interface';
import { ENVIRONMENT } from '../env/environment.constants';

@Injectable()
export class RouterMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RouterMiddleware.name);
  private readonly format: string;

  constructor(@Inject(ENVIRONMENT) readonly env: BaseEnvironmentInterface) {
    this.format = this.env.nodeEnv !== 'development' ? 'combined' : 'dev';
    this.logger.log('Initiating router logging middleware');
  }

  use(req: Request, res: Response, next: NextFunction) {
    return morgan(this.format, {
      stream: {
        write: this.logger.log.bind(this.logger),
      },
    })(req, res, next);
  }
}
