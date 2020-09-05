import { LoggerService as NestLoggerService } from '@nestjs/common';
import { LoggerEnvironmentInterface } from './environment/environment.interface';
import { BaseEnvironmentInterface } from '../env/env.interface';
import { JoinEnvironments } from '../env/env.helper';
export declare class LoggerService implements NestLoggerService {
    private readonly env;
    private readonly logger;
    constructor(env: JoinEnvironments<LoggerEnvironmentInterface, BaseEnvironmentInterface>);
    log(message: string, context?: string): void;
    warn(message: string, context?: string): void;
    error(message: string, trace: any, context?: string): void;
    private writeLog;
}
